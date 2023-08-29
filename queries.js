const { Logger } = require('aws-amplify')
const { body, validationResult } = require('express-validator')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.hwlqyukbawkpoxlsvklt.supabase.co',
  database: 'postgres',
  password: '2SzCtOaNERyk0zmY',
  port: 5432,
})

//t1 cur function

const getUsers = (request, response) => {
 
   pool.query('SELECT * FROM t1', (error, results) => {

     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })

}

const createUser = (request,response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const {name,hobbies}=request.body
    console.log(name,hobbies)
    pool.query('INSERT INTO t1(name,hobbies)VALUES($1,$2)RETURNING*',[name,hobbies],(error,results)=>{
        if (error){
            throw error
        }
        response.status(201).send(`user add`)
    })
}


const getUserById = (request,response) =>{
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM t1 WHERE id = $1',[id] ,(error,results) => {
        if (error){
            throw error
        }
        if (results.rows.length==0)
        {
            response.send(`user not found`)
        }
        else{
        response.status(200).json(results.rows)
        }
    })
}

const updateUser = (request,response) =>{
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }


    const id = parseInt(request.params.id)
    const {name,hobbies}=request.body
    pool.query('UPDATE t1 SET name =$1, hobbies=$2 WHERE id=$3',[name,hobbies,id],(error,results)=>{
        if (error){
            throw error
        }
        if(results.rows.length==0){
            response.send(`user not found`)
        }
        else{
        response.status(200).send(`user modified with id:${id}`)
        }
    })
}

const deleteUser = (request,response)=>{
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM t1 WHERE id=$1',[id],(error,results)=>{
        if(error){
            throw error
        }
        if(results.rows.length==0){
            response.send(`user not found`)
        }else{
        response.status(200).send(`user deleted with id :${id}`)
        }
    })
}


//curd of t2

const getH =(request,response)=>{
    pool.query('SELECT * FROM t2 ORDER BY id ASC', (error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getHById = (request,response) =>{
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM t2 WHERE id=$1',[id],(error,results)=>{
        if (error){
            throw  error
        }
        if (results.rows.length==0){
            response.send(`hobbies not found`)
        }
        else{
        response.status(200).json(results.rows)
        }
    })
}

const createH = (request,response)=>{

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }


    const {id,year,level,name} = request.body
    console.log(id,year,level,name)

    pool.query('INSERT INTO t2(id,year,level,name)VALUES($1,$2,$3,$4)RETURNING*',[id,year,level,name],(error,results)=>{
        if(error){
            throw error
        }
        response.status(201).send(`hobbies created `)
    })
}
const deleteH = (request,response)=>{
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM t2 WHERE hid = $1',[id],(error,results)=>{
        if(error){
            throw error
        }
        if (results.rows.length==0){
            response.send(`hobbies not found`)
        }
        else{
        response.status(200).send(`hobbies delete`)
    }
    })
}

const updateH = (request,response)=>{

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }


    const id = parseInt(request.params.id)
    const {iid,year,level,name} = request.body
    pool.query('UPDATE t2 SET id=$1 , year=$2, level=$3, name=$4 WHERE hid=$5',[iid,year,level,name,id],(error,results)=>{
        if (error){
            throw error
        }
        if (results.rows.length==0){
            response.send(`hobbies not found`)
        }
        else{
        response.status(200).send(`user modified`)
        }
    })
}


module.exports={
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,

    getH,
    getHById,createH,
    createH,
    deleteH,
    updateH,
}