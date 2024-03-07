import React, { useEffect, useRef, useContext, useState } from 'react'
import { DefaultContext } from '../../../context/context_default';

import { BarChart } from '@mui/x-charts/BarChart';

const GraficoBarras = ({ listCardDeck }) => {
    const {
        listCards,

        setListCardDeck

    } = useContext(DefaultContext);
    const [datas, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const [maxValue, setMaxValue] = useState(10); // Valor padrão, ajuste conforme necessário
    useEffect(() => {
        const auxData = [0, 0, 0, 0, 0, 0, 0, 0];

        for (const item of listCardDeck) {
            const custo = parseInt(listCards.find(e => e.id === item.id)?.custo);

            if (!isNaN(custo)) {
                if (custo < 7) {
                    auxData[custo] += item.qtd;
                } else {
                    auxData[7] += item.qtd;
                }
            }
        }

        const newMaxValue = Math.max(...auxData);
        setMaxValue(newMaxValue);

        setData([...auxData]);
    }, [listCardDeck]);
    return (
        <div>
            <BarChart

                sx={{
                    "& .MuiChartsAxis-line, & .MuiChartsAxis-tick, & .MuiChartsAxis-tickLabel": {
                        stroke: "#ffffff",
                        strokeWidth: 0.4,
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel, & .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                        fill: "#ffffff",
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line, & .MuiChartsAxis-left .MuiChartsAxis-line": {
                        stroke: "#ffffff",
                        strokeWidth: 0.4,
                    },
                }}
                // bottomAxis={{ disableTicks: true }}
                axisHighlight={{ x: 'none', y: 'none' }}
                margin={{ top: 5, left: -2, right: 0, bottom: 30 }}
                xAxis={[{ scaleType: 'band', data: ['0', '1', '2', '3', '4', '5', '6', '+7'] },
                {
                    disableLine: true, // min step: 24h
                },]}
                series={[{ data: datas }]}
                width={290}
                height={100}

                yAxis={[{ max: maxValue, }]}
            />
        </div>
    );
}

GraficoBarras.propTypes = {}

export default GraficoBarras