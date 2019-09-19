
import Mock from 'mockjs'
const count = 100;
const Random = Mock.Random;

const Category = [];

for (let i = 0; i < count; i++) {
    Category.push(Mock.mock({
        id: Random.id(),
        name: '@title(1, 2)',
        icon: Random.image('100x100'),
        desc: '',
        createtime: '@datetime',
        uid: '1',
    }))
}



export default [
    {
        url: '/workflow/getCategory',
        type: 'get',
        response: config => {
            const { page, limit } = config.query

            let mockList = Category;

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },
    {
        url: '/workflow/createCategory',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    {
        url: '/workflow/updateCategory',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    {
        url: '/workflow/deleteCategory',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },


]
