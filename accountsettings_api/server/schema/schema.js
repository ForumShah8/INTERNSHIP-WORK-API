const graphql = require('graphql');
const _ = require('lodash');

const Staffmember = require('../models/staffmember');

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
        } = graphql;

const StaffMemberType = new GraphQLObjectType ({
    name:'Staff_Member',
    fields: () => ({
        name: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        status: {type:GraphQLString}
        
    })
});

const RootQuery = new GraphQLObjectType ({
    name:"RootQueryType", 
    fields: () =>( {
        //staff_member returns the information of a particular staff member (basically search by name)
        staff_member: {
            type: StaffMemberType, 
            args: {name:{type: GraphQLString}},
            resolve(parent,args){
                //code to get data from db/ other source
                return Staffmember.findOne({name:args.name})
                //return _.find(staff_members, {name: args.name});
            }
            },
        //staff_members displays the information of all members
        staff_members: {
            type:new GraphQLList(StaffMemberType),
            resolve(parent,args){
                return Staffmember.find({});
            }
        },
        //staff_member_status does the filter search by status of the staff member (active / deactivated)
        staff_member_status: {
            type:StaffMemberType,
            args: {status:{type:GraphQLString}},
            resolve(parent,args){
                return Staffmember.findOne({status:args.status})
                //return _.filter(staff_members, {status: args.status})
            }
        },
    })

});
//mutation will be updated and linked to the database, once the database is created.
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //addStaffMember mutation can basically add a new members information 
        
        addStaffMember: {
            type: StaffMemberType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                firstname: {type:new GraphQLNonNull(GraphQLString)},
                lastname: {type:new GraphQLNonNull(GraphQLString)},
                email: {type:new GraphQLNonNull(GraphQLString)},
                status: {type:new GraphQLNonNull(GraphQLString)}    
            },
            resolve(parent,args){
                let staffmember = new Staffmember({
                    name : args.name,
                    firstname : args.firstname, 
                    lastname : args.lastname,
                    email: args.email,
                    status : args.status
                });
                return staffmember.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
