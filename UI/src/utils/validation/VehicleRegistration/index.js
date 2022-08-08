export const ValidatePlateNumber =plateNumber=>{
    let errors={};
   if(!plateNumber){
    errors.plateNumber="Required field";
   }else if(plateNumber.length>7||plateNumber.length<4){
    errors.plateNumber="Invalid Plate Number"
   }
   return errors;
}

export const ValidateEngineCapacity =engineCapacity=>{
    let errors={};
   if(!engineCapacity){
    errors.engineCapacity="Required field";
   }
   return errors;
}

export const ValidateVehicleType =vehicleType=>{
    let errors={};
   if(!vehicleType){
    errors.vehicleType="Required field";
   }
   return errors;
}


export const ValidateFuelType =fuelType=>{
    let errors={};
   if(!fuelType){
    errors.fuelType="Required field";
   }
   return errors;
}
