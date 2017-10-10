import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { FOOD_TYPES, FOOD_LIMITS } from './constants';

export class SummaryTable extends React.PureComponent {
    getTotalServings() {
        const foods = this.props.foods;

        // Total the servings for each food type
        let sums = {};
        for (let f of FOOD_TYPES) {
            sums[f] = 0;
        }
        for (let food of foods) {
            sums[food.type] += food.servings
        }

        return sums;
    }

    render() {
        const totals = this.getTotalServings();
        const props = this.props;

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Food Type</th>
                        <th>Total Servings</th>
                    </tr>
                </thead>
                <tbody>{
                    Object.keys(totals).map((type, index) => {
                        if (props.statusReport && FOOD_LIMITS[type]) {
                            if (totals[type] > FOOD_LIMITS[type]) {
                                const tooltip = (
                                    <Tooltip id='tooltip'>You're over the recommended limit of {FOOD_LIMITS[type].toString()} servings!</Tooltip>
                                );

                                return (
                                    <OverlayTrigger key={index} placement='right' overlay={tooltip}>
                                        <tr key={index} className='danger'>
                                            <td>{type}</td>
                                            <td>{totals[type]}</td>
                                        </tr>
                                    </OverlayTrigger>
                                );
                            }
                        }

                        return (
                            <tr key={index}>
                                <td>{type}</td>
                                <td>{totals[type]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default SummaryTable;