import {EnhancedTooltipInterface} from "./interfaces.ts";


const EnhancedTooltip = ({ active, payload, label, dataName, unit }: EnhancedTooltipInterface) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
            <p className="font-semibold">{`Année: ${label}`}</p>
            <p className="text-blue-600">
                {`${dataName || payload[0]?.name}: ${payload[0]?.value?.toLocaleString()} ${unit || "kWh"}`}
            </p>
        </div>
    );
};

export default EnhancedTooltip;
