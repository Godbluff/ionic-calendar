import { Injectable } from '@angular/core';


@Injectable()
export class LanguageService {

  setLanguage: string = 'no';
  texts: any = {
    mainHeader: {
      no: 'Kontorets Adventskalender',
      gb: 'Office Advent Calendar'
    },
    welcome: {
      no1: 'Velkommen til kontorets adventskalender. ',
      no2: 'Kalendere er morsomme og det er alltid godt å vite at når du ankommer kontoret på morgenen, så er det en mulighet for at du har vunnet noe. ' +
      'En pose digg, Pokemon-kort, ,eller en time avspaering på slutten av dagen ' +
      'Uansett hva premien er, så er det noe å snakke om i kaffepausene. ',
      no3: 'Hvem som helst kan lage en kalender, så bare sett i gang. Det er ikke vanskelig i det hele tatt. ' +
      'Klikk på "Opprett ny kalender" om du vil starte en, eller bare skriv inn firmanavn og ditt eget navn for å sjekke om du har noe i kalenderluka i dag.',
      no4: 'Det er spennende tider!',
      gb1: 'Welcome to the Office Advent Calendar. ',
      gb2: 'Calendars are fun, and it is always great to know that every morning, when you get into the office, there will is a possibility that you have won something. ' +
      'A bag of sweets, a pack of Pokemon cards, or an hour off at the end of the day. ' +
      'Whatever the prize, it is something to talk about in coffee breaks. ',
      gb3: 'Anyone can create a calendar, so just get to it. It is not hard at all. ' +
      'Click on the "Create New Calendar" if you want to start one, or just enter your company and your own name to check whats behind the door today for you. ',
      gb4: 'We live in exciting times!',
    },
    loginHead: {
      no: 'Åpne kalender',
      gb: 'Open Calendar'
    },
    calName: {
      no: 'Kalendertittel',
      gb: 'Calendar Name'
    },
    userName: {
      no: 'Deltagernavn',
      gb: 'Participant Name'
    },
    openCal: {
      no: 'Åpne kalender',
      gb: 'View Calendar'
    },
    createNew: {
      no: 'Opprett ny kalender',
      gb: 'Create New Calendar'
    },
    adminCal: {
      no: 'Rediger eksisterende kalender',
      gb: 'Edit Existing Calendar'
    },
    errorMessage: {
      no: 'Kalenderen finnes ikke. Sjekk etter skrivefeil.',
      gb: 'Calendar does not exist. Check your spelling.'
    },
    doorClick: {
      no: 'Klikk her',
      gb: 'Click here'
    }
  };

  popovers: any = {
    frontCalName: {
      no: 'Skriv inn navnet på kalenderen du er med i.',
      gb: 'Enter the name of the calendar you wish to check.'
    },
    frontUserName: {
      no: 'Skriv inn brukernavnet ditt for denne kalenderen.',
      gb: 'Type in your user name for this calendar.'
    }
  };

  editor: any = {
    popovers: {
      calName: {
        no: 'Tittelen på selve kalenderen bil være "Julekalener for <firmanavn>."',
        gb: 'The Heading on the calendar will be "The <company name> Advent Calendar".'
      },
      calBgUrl: {
        no: 'Dersom du ikke ønsker å bruke standard-bakgrunnen på kalenderen kan du legge inn en nett-adresse til eget bilde her.',
        gb: 'If you do not wish to use the default background, enter a valid URL for another image and it will be used instead.'
      },
      companyLogo: {
        no: 'For å legge til en firmalogo på kalenderen, skriv inn en gyldig URL til bildet her.',
        gb: 'To add the logo of your company to the calendar, paste in a URL to the image here.'
      },
      adminEmail : {
        no: 'Skriv inn e-mail for å kunne hente opp glemt passord. (Virker ikke enda.)',
        gb: 'Insert e-mail for password retrieval. (Not yet functional.)'
      },
      dailyWinners: {
        no: 'Om du vil ha flere enn en vinner per dag, skriv inn tallet her. Dette gjelder for alle luker.',
        gb: 'If you wish to have more than one winner per day, insert the number here. This is added to all doors.'
      },
      updateCal: {
        no: 'Klikk her for å oppdatere all data i kalenderen.',
        gb: 'Click here to update all data in the calendar.'
      },
      unlockDoors: {
        no: 'Slå av og på mulighet for å åpne luker før 1. desember i kalenderen. Dette er en test-funksjon.',
        gb: 'Toggle participants ability to see open calendar doors before december 1st. This is a testing function.'
      },
      exitEdit: {
        no: 'Kalenderen vilbli lagret og du vil bli transportert til forsiden igjen. Du kan logge inn og redigere videre senere.',
        gb: 'This will save the calendar and bring you back to the front page. You can log back in to edit later.'
      },
      addParticipants: {
        no: 'Legg inn navnet på en ny deltager. Alle deltagere bruker kalendernavnet og sitt deltagernavn for å få tilgang til sin versjon av kalenderen.',
        gb: 'Add the name of a new participant. All participants use the calendar name and the participant name in order to access their version of the calendar.'
      },
      addPartHelp: {
        no: 'Trykk enter for a legge til.',
        gb: 'Hit enter to add.'
      },
      removeParticipant: {
        no: 'Fjern deltager.',
        gb: 'Remove participant.'
      },
      participantHelp: {
        no1: 'Alle deltagere logger inn ved å bruke navnet på kalenderen og sitt deltagernavn slik et er skrevet i denne listen.',
        no2: 'Når kalenderen er igangsatt den 1. desember, kan ikke lenger deltagerlisten redigeres.',
        gb1: 'All participants log in by using the company name of the calendar and the participant name as is it typed in this list.',
        gb2: 'Once the calendar is initiated on the 1st of December, participants can no longer be edited.'
      },
      doorHelp: {
        no: 'Velg en kalenderdato for å redigere luken.',
        gb: 'Select a calendar entry to edit it.'
      },
      editDoor: {
        no: 'Rediger luke nummer: ',
        gb: 'Edit Door Number: '
      },
      prizeHelp: {
        no: 'Gi enkort beskrivelse av dagens premie.',
        gb: 'Insert a short descriptino of the prize for this door.'
      },
      quoteHelp: {
        no: 'Skriv inn et kort sitat eller tekst om du vil (frivillig).',
        gb: 'Insert a short quote or text if you want (optional).'
      },
      instructionHelp: {
        no: 'Fortell deltagerne hvordan de får utlevert sin premie.',
        gb: 'Tell your participants how to pick up their prize.'
      },
      imageUrlHelp: {
        no: 'Legg inn en link til et bilde av premien. Dersom du ikke legger inn eget bilde, vil et standardbilde bli brukt.',
        gb: 'Insert a URL for the prize image. If nothing is added, a default image will be used.'
      },
      preview: {
        no: 'Forhåndsvisning av luke.',
        gb: 'Preview Door'
      },
      clickToOpen: {
        no1: 'Klikk på liken for å åpne.',
        no2: 'Klikk luken for å lukke, eller klikk inni for å sjekke premie.',
        gb1: 'Click door to open.',
        gb2: 'Clock door to close or inside box to open content.'
      },
      boxHelp : {
        no: 'Dette feltet lagrer alt, alltid.',
        gb: 'This box saves everything, always.'
      }
    },
    buttons: {
      updateButton: {
        no: 'Oppdater kalender',
        gb: 'Update Calendar'
      },
      unlockButton: {
        no1: 'Lås opp luker',
        no2: 'Lås Luker',
        gb1: 'Lock Doors',
        gb2: 'Unlock Doors'
      },
      endEdit: {
        no: 'Avslutt redigering',
        gb: 'End Editing'
      },
    },
    headings: {
      topHeading: {
        no: 'Kalenderverktøy',
        gb: 'Calendar Editor'
      },
      participantHeading: {
        no: 'Deltagere',
        gb: 'Participants'
      }
    }
  };

  constructor(){ }

}
