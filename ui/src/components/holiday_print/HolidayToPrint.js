import React from "react";
import PropTypes from "prop-types";
import HolidayRowRecord from "../../entity/HolidayRowRecord";
import User from "../../entity/User";

class HolidayToPrint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <table className="table" border={1} style={{height: 108, width: 517}}>
                    <tbody>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 1185, height: 1, textAlign: 'center'}} colSpan={8}>DOVOLENKA</td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 474, height: 5}} colSpan={4}><span style={{fontSize: 'xx-small'}}>Příjmení, jméno, titul</span>
                        </td>
                        <td style={{width: 456, height: 5}} colSpan={2}>
                        </td>
                        <td style={{width: 255, height: 5}} colSpan={2}><span style={{fontSize: 'xx-small'}}>Osobní číslo</span>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 474, height: 18}} colSpan={4} bgcolor="#FEFA98">Input Name</td>
                        <td style={{width: 456, height: 18}} colSpan={2}>
                        </td>
                        <td style={{width: 255, height: 18}} colSpan={2} bgcolor="#FEFA98">Input number</td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 41, height: 18}}><span style={{fontSize: 'xx-small'}}>Útvar</span></td>
                        <td style={{width: 82, height: 18}}>KIV/NTIS</td>
                        <td style={{width: 175, height: 18}}>
                        </td>
                        <td style={{width: 176, height: 18}}><span style={{fontSize: 'xx-small'}}>Číslo útvaru</span>
                        </td>
                        <td style={{width: 711, height: 18}} colSpan={4}>Number of department</td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 760, height: 18, textAlign: 'right'}} colSpan={5}><span
                            style={{fontSize: 'xx-small'}}>Žádá o dovolenou na zotavenou na kalendářní rok</span></td>
                        <td style={{width: 170, height: 18}} bgcolor="#FEFA98">Input year</td>
                        <td style={{width: 108, height: 18}} colSpan={2}>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 41, height: 18, textAlign: 'center'}}><span
                            style={{fontSize: 'xx-small'}}>od</span></td>
                        <td style={{width: 82, height: 18}} bgcolor="#FEFA98">From</td>
                        <td style={{width: 175, height: 18, textAlign: 'center'}}><span
                            style={{fontSize: 'xx-small'}}>do</span></td>
                        <td style={{width: 176, height: 18}} bgcolor="#FEFA98">To</td>
                        <td style={{width: 456, height: 18, textAlign: 'center'}} colSpan={2}><span
                            style={{fontSize: 'xx-small'}}>včetně, tj.</span>
                        </td>
                        <td style={{width: 108, height: 18}} bgcolor="#FEFA98">Number</td>
                        <td style={{width: 147, height: 18}}><span style={{fontSize: 'xx-small'}}>pracovních dnů</span>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 41, height: 18, textAlign: 'center'}} colSpan={2}><span
                            style={{fontSize: 'xx-small'}}>Místo pobytu o dovolené</span></td>
                        <td style={{width: 175, height: 18, textAlign: 'center'}} colSpan={6} bgcolor="#FEFA98">Adress
                            Adress Adress
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 41, height: 18, textAlign: 'center'}} colSpan={2}><span
                            style={{fontSize: 'xx-small'}}>Datum</span></td>
                        <td style={{width: 175, height: 18, textAlign: 'center'}} colSpan={6} bgcolor="#FEFA98">Date
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 41, height: 18, textAlign: 'center'}} colSpan={2}><span
                            style={{fontSize: 'xx-small'}}>Podpis</span>
                        </td>
                        <td style={{width: 175, height: 25, textAlign: 'center'}} colSpan={6} bgcolor="#CBFACC">
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table border={1} style={{width: 517}}>
                    <tbody>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 225}}>
                        </td>
                        <td style={{width: 79, textAlign: 'center'}}><span style={{fontSize: 'x-small'}}>Datum</span>
                        </td>
                        <td style={{width: 162, textAlign: 'center'}}><span
                            style={{fontSize: 'x-small'}}>Vedoucí útvaru</span></td>
                        <td style={{width: 221, textAlign: 'center'}}><span style={{fontSize: 'x-small'}}>Osobní oddělení</span>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 225}}><span style={{fontSize: 'x-small'}}>Schválil</span></td>
                        <td style={{width: 79}}>
                        </td>
                        <td style={{width: 162}}>
                        </td>
                        <td style={{width: 221}}>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 225}}><span style={{fontSize: 'x-small'}}>Skutečný nástup do práce</span>
                        </td>
                        <td style={{width: 79}}>
                        </td>
                        <td style={{width: 162}}>
                        </td>
                        <td style={{width: 221}}>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 225}}><span
                            style={{fontSize: 'x-small'}}>Nástup do zaměstnání po dovolené</span></td>
                        <td style={{width: 79}}>
                        </td>
                        <td style={{width: 162}}>
                        </td>
                        <td style={{width: 221}}>
                        </td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 225}} colSpan={3}><span style={{fontSize: 'x-small'}}>Z této dovolené skutečně čerpáno........pracovních
            dnů</span></td>
                        <td style={{width: 221}}>&nbsp;</td>
                    </tr>
                    <tr className="row" style={{height: 22}}>
                        <td style={{width: 225}} colSpan={4}><span style={{fontSize: 'x-small'}}>Poznámky o mzdových nárocích, neodevzdaných nástrojích,
            pracovní pomůckách aj. uveďte na rubu.</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

HolidayToPrint.propTypes = {
    user: PropTypes.instanceOf(User),
    holidayRowRecord: PropTypes.instanceOf(HolidayRowRecord),
};

export default HolidayToPrint;