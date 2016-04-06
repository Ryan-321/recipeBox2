var DB = require("./connection");

DB.models.Recipe.create({title: "PBJ", photo_url: "http://www.seriouseats.com/images/20070401istockpbjbeauty.jpg", directions: "Spread PB on one side of bread, spread jelly on the other.  Join the sides in holy matrimony and enjoy :)", ingredients: "Peanut Butter, Jelly, Bread"});

DB.models.Recipe.create({title: "Tuna Sandwhich", photo_url: "http://civileats.com/wp-content/uploads/2014/08/shutterstock_64833406-e1408596968973-680x367.jpg", directions: "Put tuna salad between two pieces of bread with lettuce, tomatoe and/or onion.", ingredients: "Bread, Tuna Salad, ????"});
