
import Mock from 'mockjs'
const count = 100;
const Random = Mock.Random;

const Department = [
    {
        id: 1,
        name: '销售部'
    },
    {
        id: 2,
        name: '市场部'
    },
    {
        id: 3,
        name: '财务部'
    },
    {
        id: 4,
        name: '技术部'
    },
    {
        id: 5,
        name: '总裁办'
    },
    {
        id: 6,
        name: '人事部'
    },
    {
        id: 7,
        name: '广告部'
    }
];
const Position = [
    {
        id: 1,
        name: '普通员工'
    },
    {
        id: 2,
        name: '副组长'
    },
    {
        id: 3,
        name: '组长'
    },
    {
        id: 4,
        name: '副总监'
    },
    {
        id: 5,
        name: '总监'
    },
    {
        id: 6,
        name: '经理'
    },
    {
        id: 7,
        name: '总经理'
    },
    {
        id: 8,
        name: '副总裁'
    },
    {
        id: 9,
        name: '总裁'
    },
    {
        id: 10,
        name: '董事长'
    }
];
const Employee = [];

for (let i = 0; i < count; i++) {
    let dep = Department[Math.ceil(Math.random() * Department.length - 1)];
    let pos = Position[Math.ceil(Math.random() * Position.length - 1)];
    Employee.push(Mock.mock({
        id: Random.id(),
        name: Random.name(),
        birth: Random.date(),
        sex: Random.natural(0, 1),
        tel: Random.natural(),
        mail: Random.email(),
        address: Random.county(true),
        department_id: dep.id,
        department_name: dep.name,
        position_id: pos.id,
        position_name: pos.name,
    }))
}



export default [
    {
        url: '/workflow/getDepartment',
        type: 'get',
        response: config => {
            const { page, limit } = config.query
            
            let mockList = Department;

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: page ? pageList : mockList 
                }
            }
        }
    },
    {
        url: '/workflow/getPosition',
        type: 'get',
        response: config => {
            const { page, limit } = config.query
            

            let mockList = Position;

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: page ? pageList : mockList
                }
            }
        }
    },
    {
        url: '/workflow/getEmployee',
        type: 'get',
        response: config => {
            const { page, limit } = config.query

            let mockList = Employee;

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))


            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: page ? pageList : mockList
                }
            }
        }
    },

]
