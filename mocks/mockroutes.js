'use strict';

let fs = require('fs');
let express = require('express');
let path = require('path');
let mockRouter = express.Router();

let data = {

    getLoginProfessional: JSON.parse(fs.readFileSync(__dirname+'/loginProfessional.json', 'utf8')),
    postListProfessionals: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsGeneral.json', 'utf8')),
    postListProfessionalsPlumber1: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsPlumbers1.json', 'utf8')),
    postListProfessionalsPlumber2: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsPlumbers2.json', 'utf8')),
    postListProfessionalsPlumber3: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsPlumbers3.json', 'utf8')),
    postListProfessionalsElectrical: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsElectrical.json', 'utf8')),
    postListProfessionalsElectrical2233: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsElectrical2233.json', 'utf8')),
    postListProfessionalsElectrical2244: JSON.parse(fs.readFileSync(__dirname+'/listProfessionalsElectrical2244.json', 'utf8')),
    errorPagination: JSON.parse(fs.readFileSync(__dirname+'/errorPagination.json', 'utf8')),
    errorGeneral: JSON.parse(fs.readFileSync(__dirname+'/errorGeneral.json', 'utf8'))
   
};


mockRouter.get('/login', function(req, res, next) {
    res.send(data.getLoginProfessional);
});

/*Ejemplo de parámetros en la misma ruta del get */
/*mockRouter.get('/getAllProfessionals/:category/:localization/:paginationKey*?', function(req, res, next) {
 
    if ( req.params.category ==='all' && 
                        req.params.localization ==='all' && 
                                req.params.paginationKey === undefined  ){
               res.send(data.postListProfessionals);
               return;
    }

    if( req.params.paginationKey !== undefined   ){

        if( req.params.category === '1' ) {
            //Asumo que el category 1 es para los fontaneros
               if( req.params.paginationKey === "2" ){
                   res.send(data.postListProfessionalsPlumber2);
                   return;
               }else
                   if( req.params.paginationKey === "3" ){
                       res.send(data.postListProfessionalsPlumber3);
                       return;
                   }
       }

       if( req.params.category === '2') {
           //Asumo que el category 2 es para los electricistas
              if( req.params.paginationKey === "2233" )
                  res.send(data.postListProfessionalsElectrical2233);
              else
               if( req.params.paginationKey === "2244" )
                  res.send(data.postListProfessionalsElectrical2244);

      }
     //Si hay algún tipo de error en la paginación, devuelvo un error
      res.send(data.errorPagination);

    }

     //Si no hay paginación analizado entonces el body, concretamente su filtro

   if ( req.params.category === 'all'  )
    res.send(data.postListProfessionals);
else
    if( req.params.category === '1' ) //Categoría 1, la categorizo como fontaneros
         res.send(data.postListProfessionalsPlumber1);
    else
        if( req.params.category === '2' ) //Categoría 2, la categorizo como electricistas
         res.send(data.postListProfessionalsElectrical);


});*/

/*Ejemplo como query en la ruta url...es decilll, asín http://host/services/getprofessionals?category=....&paginationKey=...*/
mockRouter.get('/getProfessionals/', function(req, res, next) {
    
       if ( req.query.category === undefined && 
                           req.query.localization ===undefined && 
                                   req.query.paginationKey === undefined  ){
                  res.send(data.postListProfessionals);
                  return;
       }

       if ( req.query.category !== undefined &&   req.query.category !== '1' && 
                req.query.category !=='2'  ){
            res.send(data.errorGeneral);
        return;
       }

   
       if( req.query.paginationKey !== undefined   ){
   
           if( req.query.category === '1' ) {
               //Asumo que el category 1 es para los fontaneros
                  if( req.query.paginationKey === "2" ){
                      res.send(data.postListProfessionalsPlumber2);
                      return;
                  }else
                      if( req.query.paginationKey === "3" ){
                          res.send(data.postListProfessionalsPlumber3);
                          return;
                      }
          }
   
          if( req.query.category === '2') {
              //Asumo que el category 2 es para los electricistas
                 if( req.query.paginationKey === "2233" )
                     res.send(data.postListProfessionalsElectrical2233);
                 else
                  if( req.query.paginationKey === "2244" )
                     res.send(data.postListProfessionalsElectrical2244);
   
         }
        //Si hay algún tipo de error en la paginación, devuelvo un error
         res.send(data.errorPagination);
   
       }
   
        //Si no hay paginación analizado entonces el body, concretamente su filtro
   
      if ( req.query.category === 'all'  )
       res.send(data.postListProfessionals);
   else
       if( req.query.category === '1' ) //Categoría 1, la categorizo como fontaneros
            res.send(data.postListProfessionalsPlumber1);
       else
           if( req.query.category === '2' ) //Categoría 2, la categorizo como electricistas
            res.send(data.postListProfessionalsElectrical);
   
   
   });

/*Ejemplo de machos alpah pero no cumple ningún standard. 
se reciben los parámetros en el body del post...*/

mockRouter.post('/getAllProfessionals', function(req, res, next) {
   
   console.log(req.body);
    
   if ( req.body.headerData && 
                    req.body.headerData.pagination &&  
                            req.body.headerData.pagination.paginationFlag ){
      //Como hay paginación, necesito el mismo filtro que la desencadenó.
        console.log("hay paginacion"  + req.body.headerData.pagination.paginationKey);


        if( req.body.listProfessionalsInputType.filterProfessionals.category === 1 ) {
             //Asumo que el category 1 es para los fontaneros
                if( req.body.headerData.pagination.paginationKey === "2" ){
                    res.send(data.postListProfessionalsPlumber2);
                    return;
                }else
                    if( req.body.headerData.pagination.paginationKey === "3" ){
                        res.send(data.postListProfessionalsPlumber3);
                        return;
                    }
        }

        if( req.body.listProfessionalsInputType.filterProfessionals.category === 2) {
            //Asumo que el category 2 es para los electricistas
               if( req.body.headerData.pagination.paginationKey === "2233" )
                   res.send(data.postListProfessionalsElectrical2233);
               else
                if( req.body.headerData.pagination.paginationKey === "2244" )
                   res.send(data.postListProfessionalsElectrical2244);

       }
      //Si hay algún tipo de error en la paginación, devuelvo un error
       res.send(data.errorPagination);

   }

   //Si no hay paginación analizado entonces el body, concretamente su filtro

   if ( req.body.listProfessionalsInputType.filterProfessionals === undefined  )
       res.send(data.postListProfessionals);
   else
       if( req.body.listProfessionalsInputType.filterProfessionals.category === 1 ) //Categoría 1, la categorizo como fontaneros
            res.send(data.postListProfessionalsPlumber1);
       else
           if( req.body.listProfessionalsInputType.filterProfessionals.category === 2 ) //Categoría 2, la categorizo como electricistas
            res.send(data.postListProfessionalsElectrical);


});


module.exports = mockRouter;
