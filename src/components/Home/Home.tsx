import rockSmall from '../../assets/images/rockSmall.png';
import paperSmall from '../../assets/images/paperSmall.png';
import scissorsSmall from '../../assets/images/scissorsSmall.png';
import {Outlet, Link} from 'react-router-dom';
import React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

const lngs: {} = {
    en: {nativeName: 'English'},
    lv: {nativeName: 'Latvian'},
    ar: {nativeName: 'العربية'},
};

export const Home = () => {
    // Translation
    const [count, setCounter] = useState(0);
    const {t, i18n} = useTranslation();

    const langChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
        setCounter(count + 1);
    };

    return (
        <>
            <div className='navBar'>
                <div>
                    <img className='smallImage' src={rockSmall} alt='Rock' />
                    <img
                        className='smallImage'
                        src={scissorsSmall}
                        alt='Rock'
                    />
                    <img className='smallImage' src={paperSmall} alt='Rock' />
                </div>
                <div>
                    <Link className='linkText' to='/'>
                        {t('homeLink')}
                    </Link>
                </div>
                <div>
                    <Link className='linkText' to='/game'>
                        {t('gameLink')}
                    </Link>
                </div>
                <div className='translateContainer'>
                    <label
                        className='formLabel translateContainer'
                        htmlFor='langChange'
                    >
                        {t('selectLanguage')}{' '}
                    </label>
                    <select
                        className='selectForm'
                        onChange={langChange}
                        name='cars'
                        id='langChange'
                    >
                        <option value='en'>English</option>
                        <option value='lv'>Latviešu</option>
                        <option value='ar'>العربية</option>
                    </select>
                </div>
            </div>
            <div className='homeContainer'>
                <p className='homeText'>{t('home1')}</p>
                <p className='homeText'>
                    {t('home2')}
                    <br />
                    {t('home3')}
                </p>
                <Link className='linkTextSmall' to='/game'>
                    {t('goToGame')}
                </Link>
            </div>
        </>
    );
};
