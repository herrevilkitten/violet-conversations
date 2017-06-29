'use strict';

var violet = require('../lib/violet.js')('einstein');
var violetUtils = require('../lib/violetUtils.js')(violet);

var violetSFStore = require('../lib/violetSFStore.js');
violet.setPersistentStore(violetSFStore.store);

violetSFStore.store.propOfInterest = {
  'appointment': ['doctor_name', 'appointment_date_time'],
  'symptomCheckin': ['reportDate', 'symptom']
}

//Violet queries for list of doctors associated with me and creates an array of expected results
violet.addKeyTypes({
  'symptomList': 'AMAZON.LITERAL',
  'diabetesSymptomOne': {
    'type': 'symptomDesc',
    'values': ['tired all the time',
                'thirsty all the time',
                'peeing a lot',
                'increased thirst and hunger',
                'frequent urination',
                'weight loss or gain',
                'fatigue',
                'blurred vision',
                'wounds that heal slowly',
                'nausea',
                'skin infections',
                'patches of darker skin',
                'breath smells sweet',
                'breath smells fruity',
                'breath has acetone odor',
                'reduced feeling in your hands or feet',
                'Dry mouth',
                'Thirst',
                'Excessive urination',
                'Hunger',
                'Weight loss',
                'Blurry vision',
                'Cloudy thinking',
                'Can\'t think',
                'Can\'t focus',
                'Wounds that won\'t heal']
  },
  'diabetesSymptomTwo': {
    'type': 'symptomDesc',
    'values': ['tired all the time',
                'thirsty all the time',
                'peeing a lot',
                'increased thirst and hunger',
                'frequent urination',
                'weight loss or gain',
                'fatigue',
                'blurred vision',
                'wounds that heal slowly',
                'nausea',
                'skin infections',
                'patches of darker skin',
                'breath smells sweet',
                'breath smells fruity',
                'breath has acetone odor',
                'reduced feeling in your hands or feet',
                'Dry mouth',
                'Thirst',
                'Excessive urination',
                'Hunger',
                'Weight loss',
                'Blurry vision',
                'Cloudy thinking',
                'Can\'t think',
                'Can\'t focus',
                'Wounds that won\'t heal']
  },
  'diabetesSymptomThree': {
    'type': 'symptomDesc',
    'values': ['tired all the time',
                'thirsty all the time',
                'peeing a lot',
                'increased thirst and hunger',
                'frequent urination',
                'weight loss or gain',
                'fatigue',
                'blurred vision',
                'wounds that heal slowly',
                'nausea',
                'skin infections',
                'patches of darker skin',
                'breath smells sweet',
                'breath smells fruity',
                'breath has acetone odor',
                'reduced feeling in your hands or feet',
                'Dry mouth',
                'Thirst',
                'Excessive urination',
                'Hunger',
                'Weight loss',
                'Blurry vision',
                'Cloudy thinking',
                'Can\'t think',
                'Can\'t focus',
                'Wounds that won\'t heal']
  },
  'diabetesSymptomFour': {
    'type': 'symptomDesc',
    'values': ['tired all the time',
                'thirsty all the time',
                'peeing a lot',
                'increased thirst and hunger',
                'frequent urination',
                'weight loss or gain',
                'fatigue',
                'blurred vision',
                'wounds that heal slowly',
                'nausea',
                'skin infections',
                'patches of darker skin',
                'breath smells sweet',
                'breath smells fruity',
                'breath has acetone odor',
                'reduced feeling in your hands or feet',
                'Dry mouth',
                'Thirst',
                'Excessive urination',
                'Hunger',
                'Weight loss',
                'Blurry vision',
                'Cloudy thinking',
                'Can\'t think',
                'Can\'t focus',
                'Wounds that won\'t heal']
  },
  'diabetesSymptomFive': {
    'type': 'symptomDesc',
    'values': ['tired all the time',
                'thirsty all the time',
                'peeing a lot',
                'increased thirst and hunger',
                'frequent urination',
                'weight loss or gain',
                'fatigue',
                'blurred vision',
                'wounds that heal slowly',
                'nausea',
                'skin infections',
                'patches of darker skin',
                'breath smells sweet',
                'breath smells fruity',
                'breath has acetone odor',
                'reduced feeling in your hands or feet',
                'Dry mouth',
                'Thirst',
                'Excessive urination',
                'Hunger',
                'Weight loss',
                'Blurry vision',
                'Cloudy thinking',
                'Can\'t think',
                'Can\'t focus',
                'Wounds that won\'t heal']
  }
});

//common across multiple goals
violet.addPhraseEquivalents([
 ['I\'m', 'I am']
]);

violet.addTopLevelGoal('{{telemedicine}}');

violet.respondTo({
  expecting: ['I am not feeling well'],
  resolve: (response) => {
   response.addGoal('{{quickCheckIn}}');
}});

violet.defineGoal({
  goal: '{{quickCheckIn}}',
  prompt: ['I am sorry to hear that. What\'s going on?', 'I am sorry to hear that. Tell me what you\'re feeling'],
  respondTo: [{
    expecting: ['Nevermind', 'Gotta run now', 'Don\'t want to talk about it'],
    resolve: (response) => {
     response.say('Okay. If you need me, I\'m here to help');
  }}, {
    expecting: ['[[diabetesSymptomOne]]', '[[diabetesSymptomOne]] and [[diabetesSymptomTwo]]', '[[diabetesSymptomOne]] and [[diabetesSymptomTwo]] and [[diabetesSymptomThree]]', '[[diabetesSymptomOne]] and [[diabetesSymptomTwo]] and [[diabetesSymptomThree]] and [[diabetesSymptomFour]]', '[[diabetesSymptomOne]] and [[diabetesSymptomTwo]] and [[diabetesSymptomThree]] and [[diabetesSymptomFour]] and [[diabetesSymptomFive]]'],
    resolve: (response) => {
      var diabetesSymptomOne = response.get('[[diabetesSymptomOne]]');
      var diabetesSymptomTwo = response.get('[[diabetesSymptomTwo]]');
      var diabetesSymptomThree = response.get('[[diabetesSymptomThree]]');
      var diabetesSymptomFour = response.get('[[diabetesSymptomFour]]');
      var diabetesSymptomFive = response.get('[[diabetesSymptomFive]]');

      console.log('diabetesSymptomOne ' + diabetesSymptomOne);
      console.log('diabetesSymptomTwo ' + diabetesSymptomTwo);
      console.log('diabetesSymptomThree ' + diabetesSymptomThree);
      console.log('diabetesSymptomFour ' + diabetesSymptomFour);
      console.log('diabetesSymptomFive ' + diabetesSymptomFive);

      var symptoms = '';

      if (diabetesSymptomOne) {
        symptoms = symptoms + '; ' + diabetesSymptomOne;
      }

      if (diabetesSymptomTwo) {
        symptoms = symptoms + '; ' + diabetesSymptomTwo;
      }
      
      if (diabetesSymptomThree) {
        symptoms = symptoms + '; ' + diabetesSymptomThree;
      }
      
      if (diabetesSymptomFour) {
        symptoms = symptoms + '; ' + diabetesSymptomFour;
      }
      
      if (diabetesSymptomFive) {
        symptoms = symptoms + '; ' + diabetesSymptomFive;
      }
      

      response.set('<<symptomCheckin.reportDate>>', new Date() );
      response.set('<<symptomCheckin.symptom>>', symptoms );
      response.store('<<symptomCheckin>>');
      response.say('Logging your symptoms');
  }}]
});

violet.registerIntents();

module.exports = violet;
