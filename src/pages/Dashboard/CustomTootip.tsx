import {EnhancedTooltipInterface} from "./interfaces.ts";


const CustomTooltip = ({ active, payload, label, unit = "kWh" }: EnhancedTooltipInterface) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white p-3 border rounded shadow-lg">
            <p className="font-medium">{label}</p>
            {payload.map((entry) => entry.name!='month_name'&&(
                <p key={entry.name} style={{ color: entry.color }}>
                    {`${entry.name}: ${entry.value?.toLocaleString()} ${unit}`}
                </p>
            ))}
        </div>
    );
};

export default CustomTooltip;
