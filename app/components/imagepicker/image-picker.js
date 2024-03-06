'use client'
import { useRef, useState } from 'react';
import styles from './image-picker.module.css'
import Image from 'next/image';
export default function ImagePicker({lable,name}) {
    const [pickedImage, setPickedImage] = useState();

    const imageInput = useRef();

    function pickClickHandler(){
        imageInput.current.click();
    }

    function handleImageChange(event){
        const file = event.target.files[0];

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload =()=>{
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }


    return(
        <div className={styles.picker}>
            <label htmlFor={name}>{lable} </label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by user' fill/>}
                </div>
                <input className={styles.input}
                        type='file'
                        id={name} 
                        accept='image/png, image/jpeg, image/jpg' 
                        name={name}
                        ref = {imageInput}
                        onChange={handleImageChange}
                        required/>
                <button className={styles.button} type='button' onClick={pickClickHandler}>
                    Pick an Image
                </button>
            </div>

        </div>
    );
}