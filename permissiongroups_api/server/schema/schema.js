const graphql = require('graphql');
const _ = require('lodash');

const Permissiongroup = require('../models/permissiongroup');
const appsmanagement = require('../models/appsmanagement');
const channelsmanagement = require('../models/channelsmanagement');
const checkoutsmanagement = require('../models/checkoutsmanagement');
const customersupport = require('../models/customersupport');
const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
        } = graphql;

//dummy data 
//var permissiongroup = [
//    {permissiongroupname:"apps management",members:1},
//    {permissiongroupname:"channels management",members:1},
//    {permissiongroupname:"checkouts management",members:1},
//    {permissiongroupname:"customer support",members:4},
//];

//var appsmanagement = [
//    {permissiongroupname: "apps management",name:"richard thomas", email: "app.manager@example.com"},
//];

//var channelsmanagement = [
//    {permissiongroupname: "channels management",name:"julie welch", email: "channel.manager@example.com"},
//];

//var checkoutsmanagement = [
//    {permissiongroupname: "checkouts management",name:"selena lutz", email: "checkout.manager@example.com"},/
//];

//var customersupport = [
  //  {permissiongroupname: "customer support",name:"alex king", email: "alex.king@example.com"},
   // {permissiongroupname: "customer support",name:"forum shah", email: "forum.shah@example.com"},
    //{permissiongroupname: "customer support",name:"lori cooper", email: "lori.cooper@example.com"},
    //{permissiongroupname: "customer support",name:"rachel zane", email: "rachel.zane@example.com"},
//];

const permissiongroupType = new GraphQLObjectType({
    name:'permissiongroup',
    fields: () => ({
        permissiongroupname: {type:GraphQLString},
        members:{type: GraphQLInt},
        appsmanagement : {
            type:appsmanagementType,
            resolve(parent,args){
                return appsmanagement.findOne({name:args.name})
                //return _.find(appsmanagement,{name: parent.name});
            }
        },
        channelsmanagement : {
            type:channelsmanagementType,
            resolve(parent,args){
                //return _.find(channelsmanagement,{name: parent.name});
                return channelsmanagement.findOne({name:args.name})
            }
        },
        checkoutsmanagement : {
            type:checkoutsmanagementType,
            resolve(parent,args){
                return checkoutsmanagement.findOne({name:args.name})
                //return Permissiongroup.findOne({name:args.name})
                //return _.find(checkoutsmanagement,{name: parent.name});
            }
        },
        customersupport : {
            type:customersupportType,
            resolve(parent,args){
                return customersupport.findOne({name:args.name})
                //return Permissiongroup.findOne({name:args.name})
                //return _.find(customersupport,{name: parent.name});
            }
        },
    })
});

const appsmanagementType = new GraphQLObjectType ({
    name:'appsmanagement',
    fields: () => ({
        permissiongroupname : {type:GraphQLString},
        name : {type:GraphQLString},
        email : {type:GraphQLString},
        names: {
            type: new GraphQLList(permissiongroupType),
            resolve(parent,args){
                return Permissiongroup.findOne({name:args.name})
                //return _.filter(permissiongroup, {name:parent.name});
            }
        }
    })
});

const channelsmanagementType = new GraphQLObjectType ({
    name:'channelsmanagement',
    fields: () => ({
        permissiongroupname : {type:GraphQLString},
        name : {type:GraphQLString},
        email : {type:GraphQLString},
        names: {
            type: new GraphQLList(permissiongroupType),
            resolve(parent,args){
                return Permissiongroup.findOne({name:args.name})
                //return _.filter(permissiongroup, {name:parent.name});
            }
        }
    })
});

const checkoutsmanagementType = new GraphQLObjectType ({
    name:'checkoutsmanagement',
    fields: () => ({
        permissiongroupname : {type:GraphQLString},
        name : {type:GraphQLString},
        email : {type:GraphQLString},
        names: {
            type: new GraphQLList(permissiongroupType),
            resolve(parent,args){
                return Permissiongroup.findOne({name:args.name})
                //return _.filter(permissiongroup, {name:parent.name});
            }
        }
    })
});

const customersupportType = new GraphQLObjectType ({
    name:'customersupport',
    fields: () => ({
        permissiongroupname : {type:GraphQLString},
        name : {type:GraphQLString},
        email : {type:GraphQLString},
        names: {
            type: new GraphQLList(permissiongroupType),
            resolve(parent,args){
                return Permissiongroup.findOne({name:args.name})
                //return _.filter(permissiongroup, {name:parent.name});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType ({
    name:"RootQueryType",
    fields: {
        permissions: {
            type:new GraphQLList(permissiongroupType),
            resolve(parent,args){
                return Permissiongroup.find({});
                //return permissiongroup
            }
        },

        appsmanagement_list : {
            type: new GraphQLList(appsmanagementType),
            resolve(parent,args){
                return appsmanagement.find({});
                //return appsmanagement
            }
        },
        channelsmanagement_list : {
            type: new GraphQLList(channelsmanagementType),
            resolve(parent,args){
                return channelsmanagement.find({});
                //return channelsmanagement
            }
        },
        checkoutsmanagement_list : {
            type: new GraphQLList(checkoutsmanagementType),
            resolve(parent,args){
                return checkoutsmanagement.find({});
                //return checkoutsmanagement
            }
        },
        customersupport_list : {
            type: new GraphQLList(customersupportType),
            resolve(parent,args){
                return customersupport.find({});
                //return customersupport
            }
        },


    }
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        create_permissiongroup : {
            type:permissiongroupType,
            args:{
                permissiongroupname : {type:new GraphQLNonNull(GraphQLString)},
                members:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                let permissiongroup = new Permissiongroup({
                    permissiongroupname: args.permissiongroupname,
                    members : args.members
                });
                return permissiongroup.save();
                //permissiongroup.push({permissiongroupname:args.permissiongroupname, members:args.members})
                //return _.find(permissiongroup,{permissiongroupname:args.permissiongroupname});
            }
        },
        appsmanagement_assign_members:{
            type:appsmanagementType,
            args:{
                permissiongroupname:{type:new GraphQLNonNull(GraphQLString)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let Appsmanagement = new appsmanagement ({
                    permissiongroupname : args.permissiongroupname,
                    name: args.name,
                    email:args.email
                });
                return Appsmanagement.save();
                //appsmanagement.push({permissiongroupname:args.permissiongroupname,name:args.name,email:args.email})
                //return _.find(appsmanagement,{name:args.name});
            }
        },
        channelsmanagement_assign_members:{
            type:channelsmanagementType,
            args:{
                permissiongroupname:{type:GraphQLString},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
            },
            resolve(parent,args){
                let Channelsmanagement = new channelsmanagement ({
                    permissiongroupname : args.permissiongroupname,
                    name: args.name,
                    email:args.email
                });
                return Channelsmanagement.save();
                
                //channelsmanagement.push({permissiongroupname:args.permissiongroupname,name:args.name,email:args.email})
                //return _.find(channelsmanagement,{name:args.name});
            }
        },
        checkoutsmanagement_assign_members:{
            type:checkoutsmanagementType,
            args:{
                permissiongroupname:{type:GraphQLString},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
            },
            resolve(parent,args){
                let Checkoutsmanagement = new checkoutsmanagement ({
                    permissiongroupname : args.permissiongroupname,
                    name: args.name,
                    email:args.email
                });
                return Checkoutsmanagement.save();
                
                //checkoutsmanagement.push({permissiongroupname:args.permissiongroupname,name:args.name,email:args.email})
                //return _.find(checkoutsmanagement,{name:args.name});
            }
        },
        customersupport_assign_members:{
            type:customersupportType,
            args:{
                permissiongroupname:{type:GraphQLString},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
            },
            resolve(parent,args){
                let Customersupport = new customersupport ({
                    permissiongroupname : args.permissiongroupname,
                    name: args.name,
                    email:args.email
                });
                return Customersupport.save();
                
                //customersupport.push({permissiongroupname:args.permissiongroupname,name:args.name,email:args.email})
                //return _.find(customersupport,{name:args.name});
            }
        },
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});