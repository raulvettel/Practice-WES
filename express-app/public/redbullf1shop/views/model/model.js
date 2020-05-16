var Model = {}

Model.cars = [{
    id: '0',
    name: 'RB 7',
    description: 'The Red Bull RB7 is a Formula One racing car designed by the Red Bull Racing team for the 2011 Formula One season. It was driven by defending champion Sebastian Vettel and Australian driver Mark Webber. The car was launched at the Circuit Ricardo Tormo in Valencia, Spain on 1 February 2011. Sebastian Vettel was the first driver to test the car.',
    price: '€ 500',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/F1_2011_Test_Jerez_20.jpg'
    },
    {
    id: '1',
    name: 'RB 8',
    description: 'The Red Bull RB8 is a Formula One racing car designed by Red Bull Racing which competed in the 2012 Formula One season. The car was driven by reigning World Drivers Champion Sebastian Vettel, and Mark Webber, with former Scuderia Toro Rosso driver Sébastien Buemi filling the role of test driver. The car was launched online on 6 February, and made its debut at the first pre-season test at Jerez.',
    price: '€ 300',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/F1_2012_Jerez_test_-_Red_Bull_2.jpg'   
    },
    {
    id: '2',
    name: 'RB 9',
    description: 'The Red Bull RB9 is a racing car designed by Formula One racing team Infiniti Red Bull Racing. The car was driven throughout the 2013 Formula One season by (then) three-time World Drivers Champion Sebastian Vettel and teammate Mark Webber. Sebastian Vettel, in keeping with his tradition of naming his cars, named his RB9 Hungry Heidi, after German model Heidi Klum. Vettel would ultimately claim the Drivers Championship title, for the fourth consecutive season',
    price: '€ 400',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Mark_Webber_2013_Catalonia_test_%2819-22_Feb%29_Day_3.jpg' 
    },
    {
    id: '3',
    name: 'RB 10',
    description: 'The Red Bull RB10 is a Formula One racing car designed by Adrian Newey for Infiniti Red Bull Racing to compete in the 2014 Formula One season. It was driven by reigning World Drivers Champion Sebastian Vettel and Daniel Ricciardo, who was promoted from sister team Scuderia Toro Rosso after Mark Webber announced his retirement from the sport at the end of the 2013 season. The RB10 was designed to use Renault Sportss new 1.6-litre V6 turbocharged engine, the Renault Energy F1-2014.',
    price: '€ 200',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Sebastian_Vettel_2014_China_Race.jpg' 
    },
    {
    id: '4',
    name: 'RB 11',
    description: 'The Red Bull RB11 is a Formula One racing car designed by Adrian Newey for Infiniti Red Bull Racing to compete in the 2015 Formula One season. It was driven by Daniel Ricciardo and Daniil Kvyat. This was the last Red Bull car with engines originally badged as "Renault" and to feature their title sponsor Infiniti as they split from Red Bull at the end of the season due to a breakdown in the teamss relationship with Renault. The RB11 was launched on 1 February 2015. During pre-season testing, the car ran a camouflage livery – akin to pre-production cars – before the team reverted to their normal livery for the race season.',
    price: '€ 400',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Daniel_Ricciardo_2015_Malaysia_FP3.jpg' 
    },
    {
    id: '5',
    name: 'RB 12',
    description: 'The Red Bull RB12 is a Formula One racing car designed by Red Bull Racing to compete in the 2016 Formula One season. The car was driven by Daniel Ricciardo, Daniil Kvyat and Max Verstappen, the lattermost of whom swapped with Kvyat mid-season, moving from Scuderia Toro Rosso to Red Bull while Kvyat moved to Toro Rosso ahead of the Spanish Grand Prix.',
    price: '€ 600',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Kvyat_Bahrain_2016.jpg' 
    },
    {
    id: '6',
    name: 'RB 13',
    description: 'The Red Bull RB13 is a Formula One racing car designed and constructed by Red Bull Racing to compete during the 2017 FIA Formula One World Championship. The car was driven by Daniel Ricciardo and Max Verstappen. It made its competitive debut at the 2017 Australian Grand Prix.',
    price: '€ 500',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Max_Verstappen_2017_Malaysia_FP2.jpg' 
    },
    {id: '7',
    name: 'RB 14',
    description: 'The Red Bull Racing RB14 is a Formula One racing car designed and constructed by Red Bull Racing to compete during the 2018 FIA Formula One World Championship. The car was driven by Daniel Ricciardo and Max Verstappen, and made its competitive début at the 2018 Australian Grand Prix. Like its predecessors the RB12 and RB13, the RB14 used a Renault engine badged as a TAG Heuer.',
    price: '€ 700',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/FIA_F1_Austria_2018_Nr._3_Ricciardo.jpg' 
}];

Model.getCars = function () {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    resolve(Model.cars)
    }, 1000);
    });
}
        
Model.getCar = function (id) {
    return new Promise(function (resolve, reject) {
    setTimeout(function () {
    var i = 0;
    while (i < Model.cars.length && Model.cars[i].id != id) i++;
    if (i < Model.cars.length)
    resolve(Model.cars[i])
    else
    reject('Car not found');
    }, 1000);
    });
}