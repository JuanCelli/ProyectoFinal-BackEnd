import passport from 'passport'
import local from "passport-local"
import { userManagerMongo } from '../daos/managers/mongo/UserManager.mongo.js'
import createHash from '../utils/createHash.js'

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