import passport from 'passport'
import local from "passport-local"
import { userManagerMongo } from '../daos/managers/mongo/UserManager.mongo.js'
import createHash from '../utils/createHash.js'

import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy
const initializePassport = () =>{
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
                const user = await userManagerMongo.login(email,password)
                if(user.error){
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