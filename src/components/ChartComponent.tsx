import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useQuery, gql } from '@apollo/client';
import { listSurveys } from '../graphql/queries';

function ChartComponent() {
    // Queries all surveys every 5 seconds
    const { loading, error, data } = useQuery(gql(listSurveys), {
        pollInterval: 5000
    });

    // State
    const [lightCount, setLightCount] = useState(0);
    const [darkCount, setDarkCount] = useState(0);
    const [contextCount, setContextCount] = useState(0);
    const [reduxCount, setReduxCount] = useState(0);
    const [mobxCount, setMobxCount] = useState(0);
    const [recoilCount, setRecoilCount] = useState(0);
    const [otherCount, setOtherCount] = useState(0);

    // Once data received, update States
    useEffect(() => {
        if (!loading) {
            setLightCount(data.listSurveys.items.filter((obj: any) => obj.modeOption === 'light').length);
            setDarkCount(data.listSurveys.items.filter((obj: any) => obj.modeOption === 'dark').length);
            setContextCount(data.listSurveys.items.filter((obj: any) => obj.stateOption === 'context').length);
            setReduxCount(data.listSurveys.items.filter((obj: any) => obj.stateOption === 'redux').length);
            setMobxCount(data.listSurveys.items.filter((obj: any) => obj.stateOption === 'mobx').length);
            setRecoilCount(data.listSurveys.items.filter((obj: any) => obj.stateOption === 'recoil').length);
            setOtherCount(data.listSurveys.items.filter((obj: any) => obj.stateOption === 'other').length);
        }
    }, [lightCount, darkCount, contextCount, reduxCount, mobxCount, recoilCount, otherCount, loading, data])

    return (
        <div style={styles.chartContainer}>
            {
                loading ? <div>Loading..</div> :
                <>
                    <h2>State Survey Results</h2>
                    <PieChart
                        style={{
                            overflow: 'visible',
                            maxWidth: '343px',
                        }}
                        
                        data={[
                            {
                                title: 'Redux',
                                value: reduxCount,
                                color: 'red'
                            }, 
                            {
                                title: 'MobX',
                                value: mobxCount,
                                color: 'blue'
                            }, 
                            {
                                title: 'Context',
                                value: contextCount,
                                color: 'yellow'
                            },
                            {
                                title: 'Recoil',
                                value: recoilCount,
                                color: 'green'
                            },
                            {
                                title: 'Other',
                                value: otherCount,
                                color: 'orange'
                            }
                        ]}
                        label={({dataEntry}) => `${dataEntry.title}`}
                        segmentsShift={(index)=> index === 0 ? 3.5 : 0}
                        labelStyle={{...defaultLabelStyle}}
                        lineWidth={40}
                        animate={true}
                    />
                </>
            }
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