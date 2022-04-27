
class Spot {
    constructor({ size, vehicle } = {}) {
      this.size = size
      this.vehicle = vehicle
    }
  
    addVehicle(vehicle) {
      if(this.isOccupied()) return false
      this.vehicle = vehicle
      return true
    }
  
    isOccupied() {
        return !!this.vehicle
    }
  
    getVehicle() {
      return this.vehicle
    }
  
    releaseVehicle() {
      const currentVehicle = this.vehicle
      this.vehicle = null
  
      return currentVehicle
    }
  }
  
  class ParkingLotAssistant {
    constructor({ floors: { floor1Spot, floor2Spot, floor3Spot } }) {
      this.emptySpots = Array.from({ length: 3 }, (_, i) => {
          if(this._getfloorIndex(1) === i) return Array.from({length: floor1Spot}, () => (new Spot({size: size++})))
          if(this._getfloorIndex(2) === i) return Array.from({length: floor2Spot}, () => (new Spot({size: size++})))
          if(this._getfloorIndex(3) === i) return Array.from({length: floor3Spot}, () => (new Spot({size: size++})))
      })
  
      this.vehicles = new Map()
    }
  
    placeVehicle(vehicle) {
        if(this.hasVehicle(vehicle.licenseId)) throw new Error('duplicate vehicle found')
      const floorIndex = this._getfloorIndex(vehicle.floor)
      for (let i = floorIndex; i < this.emptySpots.length; i++) {
        if (this.emptySpots[i].length > 0) {
          const spot = this.emptySpots[i].pop()
          spot.addVehicle(vehicle)
          this.vehicles.set(vehicle.licenseId, spot)
          return true
        }
      }
  
      return false
    }
  
    _getfloorIndex(floor) {
      return floor - 1
    }
  
    hasVehicle(licenseId) {
        return this.vehicles.has(licenseId)
    }
  
    removeVehicle(vehicle) {
      if (!this.hasVehicle(vehicle.licenseId)) return false
      const spot = this.vehicles.get(vehicle)
      spot.releaseVehicle()
      this.vehicles.delete(vehicle)
      this.emptySpots[this._getfloorIndex(this.spot.size)].push(spot)
  
      return true
    }
  }
  
  class Vehicle {
    constructor(id) {
      this.licenseId = id
    }
  }
  
  class Car extends Vehicle {
    constructor(id) {
      super(id)
      this.floor = 2
    }
  }
  
  const parkingLotAssistant = new ParkingLotAssistant({
      floors: {
          floor1Spot: 10,
          floor2Spot: 10,
          floor3Spot: 10,
      }
  })
  
  const car1 = new Car('car1')
  const car2 = new Car('car2')
  const car3 = new Car('car3')
  
  parkingLotAssistant.placeVehicle(car1)
  parkingLotAssistant.placeVehicle(car2)
  parkingLotAssistant.placeVehicle(car3)
  
  console.log(parkingLotAssistant);