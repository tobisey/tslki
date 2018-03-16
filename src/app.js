import React from 'react';
import { connect } from 'react-redux';
import { defaults, toggleWorksMenu, closeTopWindow, toggleMouseDown, toggleDragging, setInitialCoords, setDragCoords, logInTerminal } from './actions.js';
import Outfits from './outfits.js'
import Works from './works.js'
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

        if (component == 'works') {
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
        this.props.logInTerminal(`_____ leeds college of art(12/13) | leeds colege of art(12/13) ______`)
        this.props.logInTerminal(`___ chelsea college of art(13/16) | goldsmiths univeristy(13/16) ____`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`---------------------------------------------------------------------`)
        this.props.logInTerminal(`___selected exhibitions______________________________________________`)
        this.props.logInTerminal(`how to swim > july 17 > victoria baths, manchester, uk_______________`)
        this.props.logInTerminal(`no more bagels > dec 16 > buckingham road, los angeles, usa__________`)
        this.props.logInTerminal(`colourspace > aug 16 > edwardian cloakroom, bristol, uk______________`)
        this.props.logInTerminal(`chelsea degree show > jun 16 > chelse college of art, london, uk_____`)
        this.props.logInTerminal(`goldsmiths degree show > jun 16 > goldsmiths univeristy, london, uk _`)
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

    render() {
        return (
            <div>

                <div className="corpseWrapper">
                    <img onClick={() => this.corpseClick()} className="corpse" src="/images/corpse.png" alt="corpse"/>
                </div>

                <div className="nav">
                    <div className="title">
                        <p>Tobias Seymour &</p>
                        <p>Lachlan KosaniukInnes</p>
                    </div>
                    <div className="navLinks">
                        <div className="linkWrapper" onClick={() => this.props.toggleWorksMenu(this.props.worksMenuVisible)}><div className="dot" ref="worksDot"><div className="smallerDot" ref="worksSmallerDot"></div></div><a>Works</a></div>
                        <div className="linkWrapper" onClick={() => this.cvClick()}><div className="dot" ref="cvDot"><div className="smallerDot" ref="cvSmallerDot"></div></div><a>CV</a></div>
                        <div className="linkWrapper"><div className="dot" ref="emailDot"><div className="smallerDot" ref="emailSmallerDot"></div></div><a id="email" href="mailto:hotpinktrash@gmail.com?Subject=I%20would%20like%20to%20give%20you%20money%20in%20exchange%20for%20goods%20or%20services!" target="_top">hotpinktrash@gmail.com</a></div>
                    </div>
                </div>

                <div id="terminalWrap">
                    <div id="terminal">
                        {this.props.messageArray && this.props.messageArray.map(message => <p className="terminalMessage">{message}</p>)}
                    </div>
                </div>

                <div id="ep">
                    <div id="epText">EP</div>
                </div>

                <Outfits />
                {this.props.worksMenuVisible && <Works
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
        messageArray: state.messageArray && state.messageArray
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
