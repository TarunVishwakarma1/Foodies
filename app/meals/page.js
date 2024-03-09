import Link from 'next/link';
import { Suspense } from 'react';
import styles from './page.module.css'
import MealsGrid from '../components/meals/meals-gird';
import { getMeals } from '@/lib/meals';
import MealsLoadingPage from './loading-out';


async function Meals(){
    const meals = await getMeals();
    return  <MealsGrid meals={meals} />
}

export default function MealsPage(){
   
    return(
       <>
       <header className={styles.header}>
        <h1>
            Delicious meals, created{' '} <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It&apos;s easy and fun!</p>
        <p className={styles.cta}>
            <Link href = "meals/share">
                Share your favorite recipe
            </Link>
        </p>
       </header>
       <main className={styles.main}>
        <Suspense fallback={<MealsLoadingPage/>}>
            <Meals/>
        </Suspense>
       </main>
       </>
    );
}