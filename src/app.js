import React from 'react';
import { connect } from 'react-redux';
import { defaults, toggleWorksMenu, closeTopWindow, toggleMouseDown, toggleDragging, setInitialCoords, setDragCoords, logInTerminal, epModeToggle, windowUnmounted, toggleWork } from './actions.js';
import Outfits from './outfits.js'
import Works from './works.js'
import EpWorks from './epWorks.js'
import Bruce from './bruce.js'
import Lift from './lift.js'
import Carmonica from './carmonica.js'
import NotStatic from './notStatic.js'
import Font from './font.js'
import Parallels from './parallels.js'
import Pink from './pink.js'
import Break from './break.js'
import Twelve from './twelve.js'
import Rhythm2 from './rhythm2.js'
import Raitre from './raitre.js'
import EditedFilms from './editedFilms.js'
import Pillows from './pillows.js'
import EP from './EP.js'
import PoolTable from './poolTable.js'
import ThatKilledMe from './thatKilledMe.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            corpseCounter: 1
        };
        this.navHandleKeyDown = this.navHandleKeyDown.bind(this)
        this.worksLED = this.worksLED.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.epMode = this.epMode.bind(this)
    }

    componentDidMount() {
        this.props.defaults();
        window.addEventListener("keydown", this.navHandleKeyDown);
        var d = new Date();
        var time = d.getHours() + ":" ;
        var mins = d.getMinutes();
        if (mins < 10) {
            mins = "0" + mins
        }
        time = time += mins
        this.props.logInTerminal(d.toDateString() + " " + time + " > welcome user no " + Math.floor(Math.random()*90000) + "...")
    }

    navHandleKeyDown(e) {
        if (e.keyCode === 87) {
            this.props.toggleWorksMenu(this.props.worksMenuVisible);
        }

        if (e.keyCode === 27) {
            this.props.closeTopWindow(this.props.worksMenuVisible);
        }
    }

    worksLED() {
        if (this.refs['worksDot'].classList.contains('dotHighlighted')) {
            this.refs['worksDot'].classList.remove('dotHighlighted');
            this.refs['worksSmallerDot'].classList.remove('smallerDotHighlighted');
        } else {
            this.refs['worksDot'].classList.add('dotHighlighted');
            this.refs['worksSmallerDot'].classList.add('smallerDotHighlighted');
        }
    }

    // DRAGGING FUNCTIONALITY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    handleMouseDown(e, component) {
        var elem = document.getElementsByClassName(component);

        if (component == 'works' || component == 'epWorks') {
            var posY = elem[0].offsetTop - 100;
        } else {
            var posY = elem[0].offsetTop;
        }

        var posX = elem[0].offsetLeft;

        this.props.toggleDragging(true);

        var coords = {
            x: e.clientX - parseInt(posX),
            y: e.clientY - parseInt(posY)
        };

        this.props.setInitialCoords(coords, component);

        e.stopPropagation();
        e.preventDefault();
    }

    handleDrag(e, component) {
        if (!this.props.dragging) {
            return
        }

        var oldLeft;
        var oldTop;

        this.props.worksVisible.map(work => {
            if (work.name == component) {
                oldLeft = work.x;
                oldTop = work.y;
            }
        })

        var newCoords = {
            x: e.clientX - oldLeft,
            y: e.clientY - oldTop
        }

        this.props.setDragCoords(newCoords, component);

        e.stopPropagation();
        e.preventDefault();
    }

    handleMouseUp(e) {
        if (this.props.dragging) {
            this.props.toggleDragging(false);

            e.stopPropagation();
            e.preventDefault();
        }
    }

    handleMouseLeave(e) {
        if (this.props.dragging) {
            this.props.toggleDragging(false);

            e.stopPropagation();
            e.preventDefault();
        }
    }

    corpseClick() {
        if (this.state.corpseCounter == 1) {

            this.props.logInTerminal(`##(############((####((((((((((((((((((((((((((((((((((((((((((((((((`)
            this.props.logInTerminal(`,******########(. ((((((((((((((((((((((((((((((((((((((((((tslki((((`)
            this.props.logInTerminal(`,,,,,*,,,,,***/..,,.#################(((((((/((((/(((/,((((((((((((((`)
            this.props.logInTerminal(`,,,,,,,,,,,,,,,(.,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,,*(.. ,,,,,,,,,,,,(##`)
            this.props.logInTerminal(`,,,,,,,,,,,,,,,#,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,.,,%/, ,,,,,,,,,,,,,,,`)
            this.props.logInTerminal(`.,,,,,...../,,,,,.,,,,..........,..,.......,......./,......,*,,,,,,,,`)
            this.props.logInTerminal(`..........,,,,,,,,,,,,.......,,,,,,.......,.....%,%*,..,,,,,,,,......`)
            this.props.logInTerminal(`*****,****(,.,.,,,,,,,,**,**********************(%(,,,,,,,*********,,`)
            this.props.logInTerminal(`**..*,,,,/,,/,,.,,,,*.***/**********/*/**********,%*,,,,,,***********`)
            this.props.logInTerminal(`//****/**/,**,,,,,,,*..*//*////////***//***/******((,,,,*.///////////`)
            this.props.logInTerminal(`*///////*,,//,,,,,,,/(./***/**//****////////////(*&(,*,,/.*///*//////`)
            this.props.logInTerminal(`**,**,**,**,#,,,,,,,**.**///*/.****////*///*/////*%*,.,,,.,//////////`)
            this.props.logInTerminal(`**/***/**,**(,,.. ,,/*.,*/****//*/*/*****/***/**#*%**.**,,,**/*//////`)
            this.props.logInTerminal(`*//*,////..*/,,, .,,**.,/**///***//*///////***//#,#*,,*,.,,*//***////`)
            this.props.logInTerminal(`/****,***.**/,..*...//,**///////////*////////*//*/*,./,,*//////,///**`)
            this.props.logInTerminal(`,*//*,/**//,/*..*..,,,*/**///////*/////**/////***//*.*,,*//***//*////`)
            this.props.logInTerminal(`/**,/,//*,/*/(../..*//*//*///////////*(*////(***,,*(,**,,/***/*//////`)
            this.props.logInTerminal(`*******,/////(../..////*///////////*/////(/(/((//,,,,,**,,**/*(//((((`)
            this.props.logInTerminal(`//(*.,,////(*/.,/,,//(//(////////(/(###%%&&/////////(,/*,/(/.***/////`)
            this.props.logInTerminal(`////*///////*/,,/.,(#@@@@@@@@#///(*%&@@@@@@@@&///////,,/,,,*/*/*///((`)
            this.props.logInTerminal(`/*/////////*/*,**.**%@@@@@@@@@%./////&&@@@@@@@@@&//*/,,,//(////////((`)
            this.props.logInTerminal(`///////////,,**,/./((&@@@@@@@@@&.///*//&&@@@@@@@@@@#***(...,/(///////`)
            this.props.logInTerminal(`/**//*/*(//*/*%.(.///%@@@@@@@@@@@/,*/////&&@@@@@@@@@@@&*/*((/,/(///,,`)
            this.props.logInTerminal(`*/*////////*/(##,/*//#(/((%@@&&&%#(./////*/%(,...........////*(//(/((`)
            this.props.logInTerminal(`/////*////*//***/%,...,..............*//*//*/*,.....,*****(///(//////`)

        } else if (this.state.corpseCounter == 2) {

            this.props.logInTerminal(`...,,,.,,,,,,,,,,,,.,,....,,,,,,,,,...,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`)
            this.props.logInTerminal(`,,,,,,,,,,,.,,,,,,,,,,,,,.,,,,,,,..,,,,,,,,,*,.,,,,,,,*,,,*,,,**,,,..`)
            this.props.logInTerminal(`*,,,,*********,,,,**,,,**,,*,,,,,,*,*,,,,*,,***,,*,,,,.,.,,,,,,,*,***`)
            this.props.logInTerminal(`,,***//******,,,,,,,,,,.,,.,.,,,,*%%#((#(,....*,..,,*.,.,,,*,,.,,,*,,`)
            this.props.logInTerminal(`,,,,,,,,,,..,,,,,*,,,*,.,.....///%#%%####*,,,,,,.,,**,*//(((((((((/,,`)
            this.props.logInTerminal(`,,,,,,.,,,,,,,,,,,,*//****. .,,***#*,/#%%%%##(**///(##%%&%&&&&&&&&&&&`)
            this.props.logInTerminal(`**,,,,,,,,,,,,,,,,,,,,,,,, ...,*,..(##%%%%%%%#*/*/((#%&&&&&&&&&&&&&&&`)
            this.props.logInTerminal(`,,,,,*,,,**,,**,,,,,,,,(#*,....,,,*/.,.*#(#/**(#%%%%%%(&&&&&&&&&&&&&&`)
            this.props.logInTerminal(`,,,,,,,,,,,,,***,,,,,*%###///(#//*,...,.,.*..,/#%%%##%%%%#(%&&&&&%%%%`)
            this.props.logInTerminal(`,,,,,,,,,***,,,,,**(%%#((/(######(/,//(((%#.,..*/#################(//`)
            this.props.logInTerminal(`,,,,,,,,,,,,,,,*(/((#*/(#####%%#((//*/((((((((,****((((###*,...,,,,,,`)
            this.props.logInTerminal(`,,, .. ......,/(#########%%%%%###(((#####/,,***..,,.,,,,,,,,,,,,,,,,,`)
            this.props.logInTerminal(`,,, ,,... ...,,/##%%%#%%%%%#%%%##(######%##((**,,*.,,****************`)
            this.props.logInTerminal(`.,, .,.........,((#%%%###########%%%%%%###%##((/*.*************//////`)
            this.props.logInTerminal(`,,,, ..,..,,*,,,.*(((########(##%%%%###%%%%###(/ *//******////(((((##`)
            this.props.logInTerminal(`,,,, . ....,,,,**,,**/###%%##(####%%%%%%%%%####,*,,,,,*////(((((##%%%`)
            this.props.logInTerminal(`.,,, ,, ....**,,,,,,*/(%%#*%%########(####(//..,,*****////(((((##%%%%`)
            this.props.logInTerminal(`,,,,.,,.. ..,,*,,,,,,,####(#*(((/////////**, ..,**/////////((((###%%%`)
            this.props.logInTerminal(`,,..... . .,,*,,,,.*,*.(##/**,,.,*,,,,,,,,.***//(#########((((((#%%%%`)
            this.props.logInTerminal(`,...,... . ......,..,,.,,.,,,,,*/*,,,,,.. **//(##%%&%%%%%%%####(*#%%%`)
            this.props.logInTerminal(`.... .,.*,.,.. .....,,..,,,,(%##%%#(/,.,...,/(##%&&&&&&&&&&%%###(/,##`)
            this.props.logInTerminal(`......*%%//(,(*,,*,*,*,,(&%%#%%%%%%&&%#*...,//(#%%&&&&&&&&&%%%###((//`)
            this.props.logInTerminal(`....,,*/((#%**(((((((##########%%##((//(,...,/(##%%%%&&&&&&&&%%######`)
            this.props.logInTerminal(`...,//tslki/////(((((((((((#######((((//**..,,/((###%%%%&&&&&%%%%%###`)
            this.props.logInTerminal(`.,*////////////////////((((((((((((((///**,..,,//((###%%%%%%&&&%%%%%%`)

        } else if (this.state.corpseCounter == 3) {

            this.props.logInTerminal(`//(((%&&&%&&&&&&&&&&%%%%##(////((/#%%%%%%#//*/##%%%%%(*******(***/***`)
            this.props.logInTerminal(`%%%%%#%%#(////(%#////*///*********//*******((#%%%%%//*******#%%%%%%%%`)
            this.props.logInTerminal(`////*/%/*##******************************,***,,,*,**(###%%%%#****/*((`)
            this.props.logInTerminal(`******,*,***##**#(*,,,,,,,,,***********,**,,,,,*,,,,,,*,*,,,,/#####%%`)
            this.props.logInTerminal(`******,*,,,*,,,,,,,##,*#(,,,,,,,,,****,,,,*,*,,*,,((*,,,,,,,,**,,,,,,`)
            this.props.logInTerminal(`,,*,,,,,,,,,,,,,,,,,,,,*,(#,###(,,,*,*(#(*,,,*,,,,*,,*,,,,,,,,,,,,*,,`)
            this.props.logInTerminal(`,,,,,,,,,,,,,,,(###%%%%%%%%%%%%%%%%%###,,,,,,,,*,,,,,,,*,,,,,,,*,,*,,`)
            this.props.logInTerminal(`,,,,*,,/,,*,,(#(((,%%%%%%%%%%%%%%%%%%%%%%%%#((,,,,*,,,,,,,,,,*,,/,,**`)
            this.props.logInTerminal(`,(##,,,,,,*,,(#((((((###*%%%%%%%%%%%%%%%%%%%%%%%%%%((,*,,*,,*,,*,,/,,`)
            this.props.logInTerminal(`,,,*,,,,,,,,,#(#((((((((((((((*%%%%%%%%%%%%#(.%%,////((,,,((,,*,,,,,,`)
            this.props.logInTerminal(`##,,,,,,,,,,,((#(#(((((((((#((((((((/%*///(/((////((/(,,,,,,((*,,((**`)
            this.props.logInTerminal(`##,,(##,,,,,,(#((#((((((((######(((#((/(///((//((((/(/,,,,,*,,,,*,*##`)
            this.props.logInTerminal(`,,*,###,,###,###(((((((##(((#(#(((((((/(/(((((((((/((/,,,,,,*,,,,,,,,`)
            this.props.logInTerminal(`,,,,,,,,,#(*,(((#(((((#((##(((#(#((((#((((((((((((((((,,,,,,,,,,,*,**`)
            this.props.logInTerminal(`,,*,,*,,,,,,,((#((((((#((#((####(((#(((((((((((((((((/,,*,,,*,,,,,,,,`)
            this.props.logInTerminal(`,,,,,,,/,,,,,*(((###((((##(((##(((#((#(((((((((((/((((,*,,,/*,,*,,,,,`)
            this.props.logInTerminal(`,,,,,,,,*,,*,*/####(#(#((((((##((#(((#((((((((((((((((,,,,,,,,*,,,,,,`)
            this.props.logInTerminal(`,,,*,,,,,,,,,,,,****##((((#(((((((#((#(((((((((#((((((,,,,*,*,,,,,,,,`)
            this.props.logInTerminal(`,,,,,,,,,,,,,,,,,,*,,***####((#(((((((((((((#(##((#(((*,,,,,,,,,,,,//`)
            this.props.logInTerminal(`,/,,,*,,,#,,,*,,,/,.,,,,*,***######((#((((########(#*/***,,#,,,,*,,,,`)
            this.props.logInTerminal(`*,,,,,,,,,,,,/,,/*,,,*,..,,,,****#(##(((#(##&/**%%%**,**/**,,,,,,,,,,`)
            this.props.logInTerminal(`,,,,,,,*,,,,,,,,,,,,,,,,,,,,,,,,,,,(*,********%%%#,*,###**,,,,*,,,,,,`)
            this.props.logInTerminal(`,(,,,,,,,,,,,,(,,,,,,,,*/,,,,,,,,,,,*,,,,,,,,,,/,,/###,,,/##%,,,/,,,,`)
            this.props.logInTerminal(`,,,,*,,,,,,*,,,,,,,,*,,,*,,,,,,,.,,,,,*,,,,,,,tslki,/,,/##(,,,(###,**`)
            this.props.logInTerminal(`,,,*,,,,,,,*,,,,,,,,,,,,,,/,,,,,,,,,,,,,*,,,,,,,,,,,,,,,,,,,###/,,,##`)

        } else if (this.state.corpseCounter == 4) {

            this.props.logInTerminal(`,,,.....,.....,.........,..........,.......,...............,.........`)
            this.props.logInTerminal(`,,.,....,,,.,,..,...,...,...........,........,,......................`)
            this.props.logInTerminal(`,,,,,,,.........tslki..,..................... ..,....,,,,,...,/((////`)
            this.props.logInTerminal(`.,.................................,,,,*,,,,./*/#(((///////*******,,,`)
            this.props.logInTerminal(`,..,,********/,,,,,,,,,,,*/((((((///////////%%/***,**,,,,..,,..,..,..`)
            this.props.logInTerminal(`*###(#(//////////////////////////**,,,,,....%&..,,,,,,.......,.,..,..`)
            this.props.logInTerminal(`(////****,,,,,,,,**,,,,,,,,,,,,....,.,..,...&&.,..,,,.,,.,,..,,,,,,,,`)
            this.props.logInTerminal(`*,*,,,,,.,,,,,,,*,**,*,,,,....,,..,.,......#%&/..,,,,.,,,,,,.,,,,,,,,`)
            this.props.logInTerminal(`,,,*,,,,,,,,&,,,.,,.,,,,,.,,,,..,,,,.....(((/,%/*,.,,,,,,....,,,,,,,,`)
            this.props.logInTerminal(`,,,,,,,,,,,(%,,,,,,,.*,,,,**,,,,,,,////((((/((((/////,.....,,,,,,**//`)
            this.props.logInTerminal(`,,,,,,,,,,,&&,,,,.,,,,,,,,..,/(((((((((((//(#//%%%((///*///*((((/////`)
            this.props.logInTerminal(`**,,,,,,,,,&&,,,,,,,,,,,*/((((((((((///(((/*,.(%&&&%##(((///*/*//////`)
            this.props.logInTerminal(`,,***,,*,,#%,,,,,,/(((######((((/((//*,,,,*%%&%#&&&&%%%####((///(((((`)
            this.props.logInTerminal(`*,/**,,,,%%#%%(*/,,((###%######(//**,***(#%%&&&&&&&&&&&&&&%%%%%%##(**`)
            this.props.logInTerminal(`*,,*,,(%##(*,.#(/((%####%####(/,,,*/((#%&&&&&&&&&&&&&&&&&&&&%%%%###((`)
            this.props.logInTerminal(`***/#%##((#*.,,%#//(%%#%#(#(%&&&&&&&&&&&&&&&&&&&&&&@@@@@@@&&&&&&&&&&&`)
            this.props.logInTerminal(`/((#%##((((/*,,*(#(((%&&&&%%&&&&&&&&&@@@@@@@@@@@@@@&&*%@@@@@@@@@@@@@@`)
            this.props.logInTerminal(`@#%%%##(((/******/((((%&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@`)
            this.props.logInTerminal(`(&%%%##(//***//(((#(#((#@@@@@@@@@@@@@@@@@@@@@@@@@@%%%&&&&%&&&&&&&&&&&`)
            this.props.logInTerminal(`#%&%%#(***(#%%%%%%%%%%%%%@@%&&%%&&&&%%%%&&%&&&&&&&&&&&&&&&&%&&&%%&%%%`)
            this.props.logInTerminal(`%&&%%%%&&&&&&&&&@@@&*#%@&&&%%%%%%&&&%%%%%%%%&@@@@@@%%%#%%%%###%###(((`)
            this.props.logInTerminal(`(&&@@@@@@@@@@@@@@@@@@@@@@%%#((#/##/########(#(####################/##`)
            this.props.logInTerminal(`%&&@@@@@@@@@@@@@@@@@@@@&%%#//*//(/((######(((##########((######(#####`)
            this.props.logInTerminal(`%%&@@@@@@@@@@@@@@@@@@@@%####(##**((#######(##(######(#(############((`)
            this.props.logInTerminal(`%%%&&&&%%%%%%%%%%%%#((((((/(((((//#####(#((##(######/((#(############`)

        } else if (this.state.corpseCounter == 5) {

            this.props.logInTerminal(`...**//(/*//////(#*/(/(#%%#%***%%&&&&%&&&&&&&&&&&&&&&&&%%%%%%%%%%&&&&`)
            this.props.logInTerminal(`,*.*,.*/,,**(//%#/,(%%%##(#%((%%%%%&&&&@@@&@@@&@@&&&&&%%%%##%%%&&&&&&`)
            this.props.logInTerminal(`..**,,##*,..,//%%%&%&&&%#%%%#&%%%&&&@@@@@@&@@@@@&&&@.%%%&%%%&%&&&&&&&`)
            this.props.logInTerminal(`..,*,,*,. *.... *%/#&%&%&&&%%&&&&&&%&&&&@@&@@&%&&&(%%#%%%%&&&&&&&&&&&`)
            this.props.logInTerminal(`..../*,.,.*,,.*. .%*&&&&&%%&&&%&&&@@@@@&&&&%%###%%&@&&&%%%&&&&&&@@@@@`)
            this.props.logInTerminal(`((#(*,/#(/./,,,*.*,..,*/#####/,.. .(. ./#.%#%%%#&&&&%%%&&&&&&&&&&@@@@`)
            this.props.logInTerminal(`///,,,*(###%&&%%&&*&&&&&%%%%%%%%%%%%%%%%###(&@@@&&*/(&&,.. , %/*/*/..`)
            this.props.logInTerminal(`(*//(/,,*/&@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@&&%%(%&(#%%%%`)
            this.props.logInTerminal(`%#*/*//*,##*&&&&&&&&&@@&(*,,,,*(%&(((#(((&&(((//(&&@@@@@@@@#%#/(/,,**`)
            this.props.logInTerminal(`#*/**(*,*##(*,,,,,,,,*/((*((&&&&&%%#%&(((###%###%%%%%%%%&@#%//(/**/((`)
            this.props.logInTerminal(`#%(*,*/#&%%&/,**,...*((/#(#%&&&&&%((%@@&@#%%%&%#####%%%%%%#%&(*///*//`)
            this.props.logInTerminal(`&&/*/*(#*#,,,,,,,**//((((#((####(####(((/(###########%%%%%&&&&((/*/**`)
            this.props.logInTerminal(`****,*&&%(.*,,,,*****/////(((((##(###%####((((((((((#####%%&(((((////`)
            this.props.logInTerminal(`********%%*,***/((((///######((((((##((((((((((((((((((##(#&#((//////`)
            this.props.logInTerminal(`********//***///*/*/**/*,.*(((/##((((//(%&%%#((((%&&&&@%##&&&%#((((//`)
            this.props.logInTerminal(`********/***************************//**////(((/@#@@@@@#@&&&&%###((//`)
            this.props.logInTerminal(`********//((((((((((((/(///(&@@#//&&&&(((((//,,(%@@@@@@@%&&&&%##(((((`)
            this.props.logInTerminal(`//***/**//&%%%%%%%%%%%&%&%&&@@@&&&@@@@@&%@@*,,,@@(#&@@@@&&&&&#(##((((`)
            this.props.logInTerminal(`////****//#&&&&&&&&&&&&&@@&@&&&&&&&&&@@@@&&,,,@&%%%(*/%@&&&&&&%%#####`)
            this.props.logInTerminal(`((////////(((((#@@@@@@@@@@tslki@@@@@@@@@@@,..,#%%,#%%#//&&&&&&%%%####`)
            this.props.logInTerminal(`(((////((((((((((#@@@@@@@@@@@@@@@@@@@@@@@/***///////////@@@@@&&%%%%%%`)
            this.props.logInTerminal(`#####(((#((((((####&@@@@@@@@&&&&%###(@@@@(*(%%#%&&&&%%%&&@@@@@&&&%%%%`)
            this.props.logInTerminal(`%%%##%#%#########(##@@@@@@@&&&&@@@@@@@@@@%/%&&&&&&@&&&&&&&@@@@@&&@@@@`)
            this.props.logInTerminal(`@@@@@&&&&&&&%%%%###((#////////*********//////////////*(/##%%%%&%&&%%%`)
            this.props.logInTerminal(`##%%%%&&&&%%%%%%%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&&&&`)

        }

        if ( this.state.corpseCounter == 5) {
            this.setState({
                corpseCounter: 1
            })
        } else {
            this.setState({
                corpseCounter: this.state.corpseCounter += 1
            })
        }

    }

    cvClick() {
        this.props.logInTerminal(`* * * * * * * * * * * * * * * *| c v |* * * * * * * * * * * * * * * *`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`___________| ts |__________________________________| lki |___________`)
        this.props.logInTerminal(`_____ leeds college of art(12/13) | leeds college of art(12/13) _____`)
        this.props.logInTerminal(`___ chelsea college of art(13/16) | goldsmiths univeristy(13/16) ____`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`___selected exhibitions______________________________________________`)
        this.props.logInTerminal(`how to swim > july 17 > victoria baths, manchester, uk_______________`)
        this.props.logInTerminal(`no more bagels > dec 16 > buckingham road, los angeles, usa__________`)
        this.props.logInTerminal(`colourspace > aug 16 > edwardian cloakroom, bristol, uk______________`)
        this.props.logInTerminal(`chelsea degree show > jun 16 > chelse college of art, london, uk_____`)
        this.props.logInTerminal(`goldsmiths degree show > jun 16 > goldsmiths univeristy, london, uk__`)
        this.props.logInTerminal(`space > aug 15 > testbed1, london, uk________________________________`)
        this.props.logInTerminal(`kino at spike island > may 15 > spike island, bristol, uk____________`)
        this.props.logInTerminal(`slippers > may 15 > maverick projects, london, uk____________________`)
        this.props.logInTerminal(`it is coming it is just not here yet > mar 15 > hartslane, london, uk`)
        this.props.logInTerminal(`perfectly pompous paper prints > feb 15 > the swan, london, uk_______`)
        this.props.logInTerminal(`happy birthday jesus > dec 14 > chelsea college of art, london, uk___`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
    }

    epMode() {

        // theme
        if (this.refs.ep.classList.contains('epThemeInward')) {
            this.refs.ep.classList.remove('epThemeInward');
            this.refs.epText.style.color = 'black';
            document.body.classList.remove('epTheme');
            document.getElementById('dontBeADickWrap').style.backgroundColor = '#545653';
            document.getElementById('dontBeADick').style.borderTop = '5px solid #252624';
            document.getElementById('dontBeADick').style.borderLeft = '5px solid #2B2E2C';
            document.getElementById('dontBeADick').style.borderBottom = '5px solid #B4B5B2';
            document.getElementById('dontBeADick').style.borderRight = '5px solid #838581';
            document.getElementById('dontBeADick').style.backgroundColor = 'black';
            document.getElementById('finger').classList.remove('epOnBoi');
            document.getElementById('dontBeADick').classList.remove('epOnBoi');
            this.refs.corpse.classList.remove('epThemeInwardThick');
            this.refs.nav.classList.remove('epThemeOutwardThick');
            this.refs.worksDot.classList.remove('epThemeInwardThick');
            this.refs.cvDot.classList.remove('epThemeInwardThick');
            this.refs.emailDot.classList.remove('epThemeInwardThick');
            this.refs.worksSmallerDot.classList.remove('epThemeOutward');
            this.refs.cvSmallerDot.classList.remove('epThemeOutward');
            this.refs.emailSmallerDot.classList.remove('epThemeOutward');
            this.refs.terminalWrap.classList.remove('epThemeInwardThick');
        } else {
            this.refs.ep.classList.add('epThemeInward')
            this.refs.epText.style.color = "aquamarine";
            document.body.classList.add('epTheme');
            document.getElementById('dontBeADickWrap').style.backgroundColor = 'rgb(254, 80, 174)';
            document.getElementById('dontBeADick').style.borderTop = '5px solid rgb(163, 44, 144)';
            document.getElementById('dontBeADick').style.borderLeft = '5px solid rgb(201, 55, 155)';
            document.getElementById('dontBeADick').style.borderBottom = '5px solid rgb(253, 120, 190)';
            document.getElementById('dontBeADick').style.borderRight = '5px solid rgb(253, 110, 180)';
            document.getElementById('dontBeADick').style.backgroundColor = 'blue';
            document.getElementById('finger').classList.add('epOnBoi');
            document.getElementById('dontBeADick').classList.add('epOnBoi');
            this.refs.corpse.classList.add('epThemeInwardThick');
            this.refs.nav.classList.add('epThemeOutwardThick');
            this.refs.worksDot.classList.add('epThemeInwardThick');
            this.refs.cvDot.classList.add('epThemeInwardThick');
            this.refs.emailDot.classList.add('epThemeInwardThick');
            this.refs.worksSmallerDot.classList.add('epThemeOutward');
            this.refs.cvSmallerDot.classList.add('epThemeOutward');
            this.refs.emailSmallerDot.classList.add('epThemeOutward');
            this.refs.terminalWrap.classList.add('epThemeInwardThick');
        }

        //functionality
        if (!this.props.epMode) {
            this.props.worksVisible.map(work => {
                if (work.visible) {
                    this.props.toggleWork(work.name);
                    this.props.windowUnmounted(work.name);
                }
            })
            if (this.props.worksMenuVisible) {
                this.props.toggleWorksMenu(this.props.worksMenuVisible);
                this.props.windowUnmounted('works');
            }
        } else {
            this.props.worksVisible.map(work => {
                if (work.visible) {
                    this.props.toggleWork(work.name);
                    this.props.windowUnmounted(work.name)
                }
            })
            if (this.props.worksMenuVisible) {
                this.props.toggleWorksMenu(this.props.worksMenuVisible);
                this.props.windowUnmounted('epWorks')
            }
        }
    }

    render() {

        return (
            <div>

                <div className="corpseWrapper">
                    <img ref="corpse" onClick={() => this.corpseClick()} className="corpse" src="/images/corpse.png" alt="corpse"/>
                </div>

                <div ref="nav" className="nav">
                    {!this.props.epMode &&
                        <div className="title" ref="title">
                            <p>Tobias Seymour &</p>
                            <p>Lachlan KosaniukInnes</p>
                        </div>
                    }
                    {this.props.epMode &&
                        <div className="title epThemeInwardThick" ref="title">
                            <p>Edwyn Parker</p>
                        </div>
                    }
                    <div className="navLinks">
                        <div className="linkWrapper" onClick={() => this.props.toggleWorksMenu(this.props.worksMenuVisible)}><div className="dot" ref="worksDot"><div className="smallerDot" ref="worksSmallerDot"></div></div><a>Works</a></div>
                        <div className="linkWrapper" onClick={() => this.cvClick()}><div className="dot" ref="cvDot"><div className="smallerDot" ref="cvSmallerDot"></div></div><a>CV</a></div>
                        <div className="linkWrapper"><div className="dot" ref="emailDot"><div className="smallerDot" ref="emailSmallerDot"></div></div><a id="email" href="mailto:hotpinktrash@gmail.com?Subject=I%20would%20like%20to%20give%20you%20money%20in%20exchange%20for%20goods%20or%20services!" target="_top">hotpinktrash@gmail.com</a></div>
                    </div>
                </div>

                <div id="terminalWrap" ref="terminalWrap">
                    <div id="terminal" ref="terminal">
                        {this.props.messageArray && this.props.messageArray.map(message => <p className="terminalMessage">{message}</p>)}
                    </div>
                </div>

                <div className="ep" ref="ep" onClick={() => {this.epMode(); this.props.epModeToggle()}}>
                    <div id="epText" ref="epText">EP</div>
                </div>

                <Outfits />

                {this.props.worksMenuVisible && !this.props.epMode && <Works
                    worksLED ={this.worksLED}
                    handleMouseDown = {this.handleMouseDown}
                    handleMouseUp = {this.handleMouseUp}
                    handleDrag = {this.handleDrag}
                    handleMouseLeave = {this.handleMouseLeave}
                />}

                {this.props.worksMenuVisible && this.props.epMode && <EpWorks
                    worksLED ={this.worksLED}
                    handleMouseDown = {this.handleMouseDown}
                    handleMouseUp = {this.handleMouseUp}
                    handleDrag = {this.handleDrag}
                    handleMouseLeave = {this.handleMouseLeave}
                />}

                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'bruce' && work.visible) {
                        return <Bruce ref="bruce"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'lift' && work.visible) {
                        return <Lift ref="lift"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'carmonica' && work.visible) {
                        return <Carmonica ref="carmonica"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'notStatic' && work.visible) {
                        return <NotStatic ref="notStatic"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'font' && work.visible) {
                        return <Font ref="font"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'parallels' && work.visible) {
                        return <Parallels ref="parallels"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'editedFilms' && work.visible) {
                        return <EditedFilms ref="editedFilms"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'pillows' && work.visible) {
                        return <Pillows ref="pillows"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'breakWork' && work.visible) {
                        return <Break ref="breakWork"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'pink' && work.visible) {
                        return <Pink ref="pink"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'twelve' && work.visible) {
                        return <Twelve ref="twelve"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'rhythm2' && work.visible) {
                        return <Rhythm2 ref="rhythm2"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'raitre' && work.visible) {
                        return <Raitre ref="raitre"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'EP' && work.visible) {
                        return <EP ref="EP"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'poolTable' && work.visible) {
                        return <PoolTable ref="poolTable"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'thatKilledMe' && work.visible) {
                        return <ThatKilledMe ref="thatKilledMe"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        worksMenuVisible: state.worksMenuVisible,
        worksVisible: state.worksVisible && state.worksVisible,
        topZIndex: state.topZIndex,
        allZIndex: state.allZIndex,
        dragging: state.dragging && state.dragging,
        messageArray: state.messageArray && state.messageArray,
        epMode: state.epMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        defaults() {
            dispatch(defaults())
        },

        toggleWorksMenu(visible) {
            dispatch(toggleWorksMenu(visible))
        },

        closeTopWindow(visible) {
            dispatch(closeTopWindow(visible))
        },

        toggleDragging(what) {
            dispatch(toggleDragging(what))
        },

        setInitialCoords(coords, component) {
            dispatch(setInitialCoords(coords, component))
        },

        setDragCoords(coords, component) {
            dispatch(setDragCoords(coords, component))
        },

        logInTerminal(message) {
            dispatch(logInTerminal(message))
        },

        epModeToggle() {
            dispatch(epModeToggle())
        },

        windowUnmounted(work) {
            dispatch(windowUnmounted(work))
        },

        toggleWork(work) {
            dispatch(toggleWork(work))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
