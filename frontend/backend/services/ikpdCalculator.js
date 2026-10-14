function hitungIKPD(indikator){


    let total = 0;


    indikator.forEach(item=>{


        const nilai =
        Number(item.nilai || 0);


        const bobot =
        Number(item.bobot || 0);



        total +=

        nilai * bobot;



    });



    return Number(

        (total * 25)

        .toFixed(2)

    );


}





function kategoriIKPD(nilai){


    if(nilai >= 85){

        return "Sangat Matang";

    }


    if(nilai >= 70){

        return "Matang";

    }


    if(nilai >= 55){

        return "Berkembang";

    }


    if(nilai >= 40){

        return "Awal";

    }


    return "Belum Matang";


}



module.exports={

hitungIKPD,

kategoriIKPD

};