export const users = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        age: 28,
        role: "admin",
        createdAt: "2025-01-15T10:30:00Z",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: 34,
        role: "user",
        createdAt: "2025-02-20T14:45:00Z",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        age: 45,
        role: "moderator",
        createdAt: "2025-03-10T09:15:00Z",
    },
    {
        id: "4",
        name: "Alice Williams",
        email: "alice.williams@example.com",
        age: 29,
        role: "user",
        createdAt: "2025-04-05T16:00:00Z",
    },
    {
        id: "5",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        age: 31,
        role: "user",
        createdAt: "2025-05-18T11:20:00Z",
    },
];
type user = {
    name: string,
    email: string,
    age: number,
    role: string
}
export const typeDefs = `
type user{
id: ID!
name:String
email:String
age: Int
role:String
createdAt: String
}
type userinput{
name:String
email:String
age: Int
role:String}

type Query{
users:[user]
oneuser(id:ID):user
}
type Mutation{
            createuser(name:String!,email:String!,age: Int!,role:String!): [user]}
`




export const resolvers = {
    Query: {
        users: () => {
       
        
            return users
        },
        oneuser: (_: any, { id }: { id: string }) => {
            const oneuser = users.find((user) => user.id == id)
            return oneuser
        }
    },
    Mutation: {
        createuser: (_: any, userdetail: user) => {
            console.log(userdetail);
            const newuser = {
                id: String(users?.length + 1),
                ...userdetail,
                // createdAt: String(Date.now())
                createdAt: new Date().toISOString()

            }
            console.log(newuser);
            users.push(newuser)
            return users
        }
    }


}