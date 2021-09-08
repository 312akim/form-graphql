import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useQuery, gql } from '@apollo/client';
import { listSurveys } from '../graphql/queries';

interface SurveyData {
    modeOption: string
    stateOption: string
}

function ChartComponent() {
    // Queries all surveys every pollInterval milliseconds
    const { loading, error, data } = useQuery(gql(listSurveys), {
        pollInterval: 2000
    });

    // State
    const [lightCount, setLightCount] = useState(0);
    const [darkCount, setDarkCount] = useState(0);
    const [contextCount, setContextCount] = useState(0);
    const [reduxCount, setReduxCount] = useState(0);
    const [mobxCount, setMobxCount] = useState(0);
    const [recoilCount, setRecoilCount] = useState(0);
    const [otherCount, setOtherCount] = useState(0);

    const [selectedIndex, setSelectedIndex] = useState(99);

    // Once data received, update States if any values changed
    useEffect(() => {
        if (!loading) {
            setLightCount(data.listSurveys.items.filter((obj: SurveyData) => obj.modeOption === 'light').length);
            setDarkCount(data.listSurveys.items.filter((obj: SurveyData) => obj.modeOption === 'dark').length);

            setContextCount(data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'context').length);
            setReduxCount(data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'redux').length);
            setMobxCount(data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'mobx').length);
            setRecoilCount(data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'recoil').length);
            setOtherCount(data.listSurveys.items.filter((obj: SurveyData) => obj.stateOption === 'other').length);
        }
    }, [lightCount, darkCount, contextCount, reduxCount, mobxCount, recoilCount, otherCount, loading, data])

    const onSegmentClickHandler = (e: React.MouseEvent<Element, MouseEvent>, index: number) => {
        setSelectedIndex(index);
    }

    return (
        <div style={styles.chartContainer}>
            {
                error ? <div>Error getting data..</div> :
                loading ? <div>Loading..</div> :
                <>
                    <h2>State Preference Survey Results</h2>
                    <PieChart
                        style={{
                            overflow: 'visible',
                            maxWidth: '343px',
                        }}
                        
                        data={[
                            {
                                title: selectedIndex === 0 ? reduxCount : 'Redux',
                                value: reduxCount,
                                color: 'red'
                            }, 
                            {
                                title: selectedIndex === 1 ? mobxCount : 'MobX',
                                value: mobxCount,
                                color: 'blue'
                            }, 
                            {
                                title: selectedIndex === 2 ? contextCount : 'Context',
                                value: contextCount,
                                color: 'yellow'
                            },
                            {
                                title: selectedIndex === 3 ? recoilCount : 'Recoil',
                                value: recoilCount,
                                color: 'green'
                            },
                            {
                                title: selectedIndex === 4 ? otherCount : 'Other',
                                value: otherCount,
                                color: 'orange'
                            }
                        ]}

                        onClick={(e, segmentIndex) => onSegmentClickHandler(e, segmentIndex)}

                        label={({dataEntry}) => `${dataEntry.title}`}
                        labelPosition={110}
                        segmentsShift={(index) => index === selectedIndex ? 5 : 0}
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
    fontFamily: 'sans-serif',
}

const styles = {
    chartContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        width: '500px',
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