'use strict';

describe("Thermostat", function() {
  let thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
     spyOn(window, "alert");
  });

  it("should return a default temperature of 20", function() {
    expect(thermostat._currentTemperature).toEqual(20)
  });

  it("allows user to increase the temperature", function () {
    thermostat.increaseTemperature()
    expect(thermostat._currentTemperature).toEqual(21)
  })

  it("allows user to decrease the temperature", function() {
    thermostat.decreaseTemperature()
    expect(thermostat._currentTemperature).toEqual(19)
  })

  it("has a minimum temperature of 10", function() {
    expect(thermostat.MINIMUM_TEMPERATURE).toEqual(10)
  })

  it("cannot go below 10 degrees", function() {
    for (let i = 0; i < 11; i++){
      thermostat.decreaseTemperature();
    }
    expect(thermostat._currentTemperature).toEqual(10)
  })

  it("alerts if minimum temp is reached", function () {
    // spyOn(window, "alert");
    for (let i = 0; i < 11; i++){
      thermostat.decreaseTemperature();
    }
    expect(window.alert).toHaveBeenCalled()
    })


  it("cannot go above 25 in default PS mode", function() {
    for (let i = 0; i < 6; i++) {
      thermostat.increaseTemperature();
    }
    expect(thermostat.currentTemperature).toEqual(25)
  })

  it("alerts if maximum PSM temp is reached", function () {
    // spyOn(window, "alert");
    for (let i = 0; i < 6; i++) {
      thermostat.increaseTemperature();
    }
    expect(window.alert).toHaveBeenCalled()
    })

  it("has power saving mode as the default", function() {
    expect(thermostat.isPowerSaving()).toEqual(true)
  })

  it("can switch power saving mode off", function() {
    thermostat.switchOffPowerSaving()
    expect(thermostat.isPowerSaving()).toEqual(false)
  })

  it("can switch power saving mode back on", function() {
    thermostat.switchOffPowerSaving()
    thermostat.switchOnPowerSaving()
    expect(thermostat.isPowerSaving()).toEqual(true)

  })

  it("has max temp 32 when power saving is off", function() {
    thermostat.switchOffPowerSaving()
    for ( let i = 0; i < 13; i++) {
      thermostat.increaseTemperature();
    }
    expect(thermostat.currentTemperature).toEqual(32)
  })

  it("alerts if maximum non-PSM temp is reached", function () {
    // spyOn(window, "alert");
    for ( let i = 0; i < 13; i++) {
      thermostat.increaseTemperature();
    }
    expect(window.alert).toHaveBeenCalled()
    })

  it("can reset the temperature to default temperature of 20", function() {
    thermostat.resetTemperature()
    expect(thermostat.currentTemperature).toEqual(20)
  })

  describe("displaying usage levels", function() {
    describe("when the temperature is below 18 degrees", function() {
      it("then it is low-usage", function() {
        for ( let i = 0; i < 3; i++) {
          thermostat.decreaseTemperature();
        }
        expect(thermostat.energyUsage()).toEqual("low-usage")
      });
    });
    describe("when the tempearture is between 18 and 25 degrees", function() {
      it("then it is medium-usage", function() {
        expect(thermostat.energyUsage()).toEqual("medium-usage")
      });
    });
    describe("when the temperature is anything else", function() {
      it("then it is high-usage", function() {
        thermostat.powerSavingMode = false;
        for (let i = 0; i < 6; i++) {
          thermostat.increaseTemperature()
        }
        expect(thermostat.energyUsage()).toEqual("high-usage")
      });
    });
  });

})



