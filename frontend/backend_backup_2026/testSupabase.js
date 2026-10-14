require("dotenv").config();

const supabase = require("./config/supabase");


async function test(){

    const { data, error } = await supabase
        .from("indikator_v2")
        .select("*")
        .limit(5);


    if(error){

        console.log("SUPABASE ERROR:");
        console.log(error);

        return;
    }


    console.log("SUPABASE CONNECTED");

    console.log(data);

}


test();