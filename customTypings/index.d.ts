declare module "carTyping" {
  type CarType = {
    year: string,
    make: string,
    model: string,
    nickname: string,
    rego: string,
  };
  interface CarProps {
    car: CarType,
  }
}

module.exports = {
    CarType,
    CarProps
}

export default interface VehicleDropdownItem {
  vehUUID: string;
  car: {
    year: number;
    make: string;
    model: string;
  };
  rego: string;
  nickName: string;
  name: string; // Add the calculated name field
}