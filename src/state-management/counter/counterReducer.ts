interface CounterAction {
	type: "INCREMENT" | "RESET";
}

const countrReducer = (value: number, action: CounterAction): number => {
	if (action.type === "INCREMENT") return value + 1;
	if (action.type === "RESET") return 0;

	return value;
};

export default countrReducer;
