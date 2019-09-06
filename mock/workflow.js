
import Mock from 'mockjs'
const Category = [];
const count = 10;
const Random = Mock.Random;
for (let i = 0; i < count; i++) {
    Category.push(Mock.mock({
        id: '@increment',
        name: '@title(1, 2)',
        icon: Random.image('100x100'),
        desc: 'mock data',
        createtime: '@datetime',
        uid: '1',
    }))
}

export default [
    {
        url: '/workflow/getCategory',
        type: 'get',
        response: config => {
            console.log(config.query);
            return {
                code: 20000,
                data: Category
            }
        }
    },

]
