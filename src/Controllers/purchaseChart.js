const {Purchased,Product, sequelize} = require("../db")

const purchaseChart = async(req,res)=>{

    try {

        const salesByMonth = await Purchased.findAll({
            attributes: [
                [
                    sequelize.fn(
                        "TO_CHAR",
                        sequelize.col("fechaDeCompra"),
                        "YYYY-MM-DD"
                      ),
                    "formattedDate",
                  ],
                  
              [sequelize.fn("SUM", sequelize.col("precio")), "totalSales"],
            ],
            group: ['formattedDate'],
          });

        const productSales = await Purchased.findAll({
            attributes: [
              'ProductId',
              [sequelize.fn("SUM", sequelize.col("cantidad")), "totalSales"],
            ],
            group: ["ProductId", 'Product.nombre'],
            raw: true,
            include: [
              {
                model: Product,
                attributes: ['nombre'],
                required:true
              }
            ]
          });

        console.log(productSales);

          let mostSoldProduct = "";
          let mostSoldCount = 0;

         productSales.forEach(element => {  

            

            if(mostSoldCount<Number(element.totalSales)){
                
                mostSoldProduct = element['Product.nombre'];
                mostSoldCount = element.totalSales
            }
            
         });
      
         
      
          return res.json({
            mostSoldProduct: mostSoldProduct,
            mostSoldCount: mostSoldCount,
            salesByMonth: salesByMonth,
            productSales
          });


        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

module.exports = purchaseChart