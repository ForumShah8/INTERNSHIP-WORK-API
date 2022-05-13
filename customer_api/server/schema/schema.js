const graphql = require('graphql');
const _ = require('lodash');

const Customer = require('../models/customer');

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
        } = graphql;



const CustomerType = new GraphQLObjectType ({
    name:'Customer',
    fields: () => ({
        name: {type: GraphQLString},    
        email: {type: GraphQLString},
        orders: {type:GraphQLInt},
        joindate : {type:GraphQLString},
        address: {type:GraphQLString}
        
    })
});


const RootQuery = new GraphQLObjectType ({
    name:"RootQueryType", 
    fields: () =>( {
        //customer query returns the details of the customer searching by the name
        customer: {
            type: CustomerType, 
            args: {name:{type: GraphQLString}},
            resolve(parent,args){
                return Customer.findOne({name:args.name})
                //return Customer.findOne({name:args.name})
                //code to get data from db/ other source

                //return _.find(customers, {name: args.name});
            }
            },
        //customers query will give you list of all the customers registered in the database
        customers: {
            type:new GraphQLList(CustomerType),
            resolve(parent,args){
                return Customer.find({});

                //return Customer.find({});
                //return customers
            }
        },
        //by using customers_joindate query you can sort the customers based on their joining date
        customers_joindate: {
            //type:new GraphQLList(CustomerType),
            type:CustomerType,
            args: {joindate:{type:GraphQLString}},
            resolve(parent,args){

                return Customer.findOne({joindate:args.joindate})
                //return _.filter(customers, {joindate: args.joindate})
            }
        },
        //by using customers_orderno query you can sort the customers based on their number of orders
        customers_orderno: {
            //type:new GraphQLList(CustomerType),
            type:CustomerType,
            args: {orders:{type:GraphQLInt}},
            resolve(parent,args){
                return Customer.findOne({orders:args.orders})
                //return _.filter(customers, {orders: args.orders})
            }
        },
    })

});
//mutations will be changed and linked to the database, once the database is ready
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        //addCustomer mutation will let you add the new joining customers information
        addCustomer : {
            type:CustomerType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                orders: {type:new GraphQLNonNull( GraphQLInt)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                joindate:{type:new GraphQLNonNull(GraphQLString)},
                address:{type:new GraphQLNonNull(GraphQLString)}

            },
            resolve(parent,args){
                let customer = new Customer({
                    name: args.name,
                    orders: args.orders,
                    email: args.email,
                    joindate : args.joindate,
                    address : args.address
                });
                return customer.save();
                //customers.push({name:args.name,orders:args.orders,email:args.email,joindate:args.joindate,address:args.address})
                //return _.find(customers, {name:args.name});
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation

});
