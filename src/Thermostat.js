'use strict';

class Thermostat {
  constructor() {
    this.DEFAULT_TEMPERATURE = 20
    this.MINIMUM_TEMPERATURE = 10
    this.MAXIMUM_TEMPERATURE_PS = 25
    this.MAXIMUM_TEMPERATURE_NPS = 32
    this.MEDIUM_ENERGY_LIMIT = 18
    this.HIGH_ENERGY_LIMIT = 25
    this.powerSavingMode = true
    this._currentTemperature = this.DEFAULT_TEMPERATURE
  }

  get currentTemperature() {
    return this._currentTemperature
  }

  increaseTemperature() {
    if (this.isPowerSaving() === true) {
      if (this._currentTemperature < this.MAXIMUM_TEMPERATURE_PS) {
      this._currentTemperature += 1
      }
      else{
        alert("Maximum power saving temperature reached")
      }
    }
    else {
      if (this._currentTemperature < this.MAXIMUM_TEMPERATURE_NPS) {
      this._currentTemperature += 1
    }
    else{
      alert("Maximum temperature reached")
    }
    }
  }


  decreaseTemperature() {
    if (this._currentTemperature > this.MINIMUM_TEMPERATURE) {
    this._currentTemperature -= 1
    }
    else {
    alert("Minimum temperature reached")
    }
  }

  isPowerSaving() {
    return this.powerSavingMode
  }

  switchOffPowerSaving(){
    return this.powerSavingMode = false
  }

  switchOnPowerSaving(){
    return this.powerSavingMode = true
  }

  resetTemperature(){
    return this._currentTemperature = this.DEFAULT_TEMPERATURE
  }

  energyUsage() {
    if (this._currentTemperature < this.MEDIUM_ENERGY_LIMIT) {
      return "low-usage";
    }
    if (this._currentTemperature <= this.HIGH_ENERGY_LIMIT) {
      return "medium-usage";
    }
    return "high-usage";
  }
}


