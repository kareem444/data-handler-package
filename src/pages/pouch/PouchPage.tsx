import { useEffect } from 'react'
import { kareemDB } from '../../main'

const PouchPage = () => {
    useEffect(() => {
        const k = async () => {
            // const status = await IndexedDBHelper.init('newDB', ['users'])
            // const data = await kareemDB.add('users', {
            //     id: 'new5',
            //     name: 'ahmed',
            //     age: 12,
            //     phone: ['015454']
            // })
            // const data = await kareemDB.update('users', 'kareem', { name: 'new', age: 12 }, true);
            const data = await kareemDB.get('users')
            // const data = await IndexedDBHelper.getOne('users', 'kareem');
            // const data = await IndexedDBHelper.deleteOne('users','ayman') ;
            // const data = await IndexedDBHelper.deleteAll('users') ;
            // const data = await IndexedDBHelper.openCursor('users') ;
            // const data = await IndexedDBHelper.getOne('users', [
            //     '01022564374',
            //     'not in',
            //     'phone'
            // ])
            console.log(data)
        }
        k()
    }, [])

    return <div></div>
}

export default PouchPage
