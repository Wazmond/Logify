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