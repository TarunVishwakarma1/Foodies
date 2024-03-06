import sql from 'better-sqlite3';
const db = sql('meals.db');

export async function getMeals(){
    //await new Promise((resolve)=>{setTimeout(resolve, 2000)});
    //throw new Error('Loading Meals failed');
   return db.prepare(
    `SELECT * FROM meals`
    ).all();
}

export function getMeal(meal){
    return db.prepare(
        'SELECT * FROM meals where slug = ?'
    ).get(meal)
}