export class Endpoint {
    constructor(name,criteria,optional=0) {
      
      this.endpnt1=`/${name}/${criteria}`
      
      this.endpnt2=`/${name}/${criteria}/${optional}`
    }
    
   end1(){
     return this.endpnt1
   }
    end2(){
      return this.endpnt2
    }
  }
  