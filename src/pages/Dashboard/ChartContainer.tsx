const ChartContainer = ({
                            title,
                            children,
                        }: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="h-96">{children}</div>
    </div>
);

export default ChartContainer;
