import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useQuery, gql } from '@apollo/client';
import { listSurveys } from '../graphql/queries';

const testData = [
    { modeOption: 'dark', stateOption: 'redux'},
    { modeOption: 'dark', stateOption: 'mobx'},
    { modeOption: 'light', stateOption: 'recoil'},
    { modeOption: 'dark', stateOption: 'context'},
    { modeOption: 'light', stateOption: 'redux'},
    { modeOption: 'dark', stateOption: 'other'},
    { modeOption: 'light', stateOption: 'other'},
];

function ChartComponent() {
    const { loading, error, data } = useQuery(gql(listSurveys));
    
    // console.log(data.listSurveys.items);
    
    // const lightCount = data.listSurveys.items.filter((obj: any) => obj.modeOption === 'light');
    // console.log(`length: ${lightCount.length}`);

    return (
        <div style={styles.chartContainer}>
            <PieChart
                style={{
                    overflow: 'visible',
                    maxWidth: '343px',
                }}
                data={[
                    {
                        title: 'Redux',
                        value: 25,
                        color: 'red'
                    }, 
                    {
                        title: 'MobX',
                        value: 30,
                        color: 'blue'
                    }, 
                    {
                        title: 'Context',
                        value: 45,
                        color: 'yellow'
                    },
                    {
                        title: 'Recoil',
                        value: 15,
                        color: 'green'
                    },
                    {
                        title: 'Other',
                        value: 3,
                        color: 'orange'
                    }
                ]}
                label={({dataEntry}) => `${dataEntry.title}`}
                segmentsShift={(index)=> index === 0 ? 3.5 : 0}
                labelStyle={{...defaultLabelStyle}}
                lineWidth={40}
                animate={true}
            />
        </div>
    );
}

const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif'
}

const styles = {
    chartContainer: {
        width: '343px',
        marginTop: '150px',
        marginLeft: '20px',
        padding: '25px',
        background: 'lightblue',
        borderRadius: '8px',
        border: '1px solid black',
        boxShadow: '3px 3px 3px darkgray',
    }
}

export default ChartComponent;