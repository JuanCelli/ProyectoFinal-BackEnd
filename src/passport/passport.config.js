import passport from 'passport'
import local from "passport-local"
import { userManagerMongo } from '../daos/managers/mongo/UserManager.mongo.js'
import createHash from '../utils/createHash.js'

import GitHubStrategy from 'passport-github2'
import isValidPassword from '../utils/isValidPassword.js'
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../utils/generateToken.js'



const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const LocalStrategy = local.Strategy
const initializePassport = () =>{

    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwtCookieToken']
        }
        return token;
    };

    passport.use('current', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        }, async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
        }
    ));





    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"}, async (req,username,password,done) =>{
            try {
                const {first_name,last_name,email,age,password} = req.body

                const userRegistered = await userManagerMongo.getUserByEmail(email)

                if(!userRegistered.error){
                    return done(null, false)
                }
                const user = {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: createHash(password),
                }
                const newUser = await userManagerMongo.createUser(user)
                if(!newUser.status){
                    return done(null, false)
                }
                return done(null, newUser)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"}, async (req,username,password,done) =>{
            try {
                const {email,password} = req.body
                const user = await userManagerMongo.getUserByEmail(email)
                if(user.error){
                    return done(null, false)
                }
                console.log(user)
                console.log(password)
                if(!isValidPassword(user,password)){
                    return done(null, false)
                }
                req.user = user
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("github", new GitHubStrategy(
        {clientID: "Iv1.9bfe7bffb7318b20",
        clientSecret:"53e7964ac483f7e40217172f977e4f91dd1fa746",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
        }, async (accessToken,refreshToken,profile,done) =>{
            try {
                const user = await userManagerMongo.getUserByEmail(profile._json.email)

                if(user.error){
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: 20,
                        email: profile._json.email,
                        password:createHash(""),
                        loggedBy:"GitHub"
                    }
                    const response = await userManagerMongo.createUser(newUser)
                    if(response.error) return done(null,false)
                    return done(null, response)
                }
                return done(null,user)
            }catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id);
      });

      passport.deserializeUser(async (id, done) => {
        try {
          let user = await userManagerMongo.getUserById(id)
          done(null, user);
        } catch (error) {
          console.error("Error deserializing user " + error);
        }
      });



}

export default initializePassport