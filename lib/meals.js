import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
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
export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower:true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferImage,(error)=>{
        if(error){
            throw new Error('Saving Image failed!');
        }
    }));

    meal.image = `/images/${fileName}`;

    db.prepare(`
    INSERT INTO meals (slug,title,image,summary,instructions,creator,creator_email)
    VALUES (
        @slug,
        @title,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
    )
    `).run(meal);
}
