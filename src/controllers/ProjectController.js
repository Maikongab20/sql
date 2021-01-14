const knex = require('../database');
const { create } = require('./UserController');


module.exports = {
    async index(req, res, next){
       try {
         const {user_id, page = 1} = req.query;


         const query = knex('project')
         .limit(5)
         .offset((page - 1) * 5)

         if(user_id){
            query
            .where({user_id})
            .join('users','users.id','=','project.user_id')
            .select('project.*', 'users.username')

         }
         const [count] = await knex('project').count()
         console.log(count)

         res.header('X-Total-Count',count["count"])

         const results = await query


         return res.json(results)
       } catch (error) {
          next(error)
       }
   },
   async create(req, res, next){
      try {  
         const {title, user_id} = req.body

  
         await knex('project').insert({
           title,
           user_id
        })
        
        return res.status(201).send()
      } catch (error) {
         next(error)
         
       }
   }
}