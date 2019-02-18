import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingCircle from '../components/LoadingCircle';
import DishStatusStepper from '../components/DishStatusStepper';

export default class CallServiceScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			restaurant: null,
			order: [],
			data: [],
			status: 'loading'
		};
	}

	async removeOrderItem(dishId) {
		var found = false;

		let order = await this.state.order.map((x) => {
			if (!found && x && x.dishId && x.dishId === dishId) {
				found = true;
			} else {
				return x;
			}
		});

		this.setState({
			order: order
		});
	}

	async createOrder() {}

	async componentWillMount() {
		try {
		} catch (err) {
			console.error(err);
			this.setState({
				status: 'failed'
			});
		}
	}

	render() {
		return this.state.restaurant && this.state.restaurant.restaurantId ? (
			<View style={styles.container}>
				<View style={styles.dishStatus}>
					<DishStatusStepper />
				</View>
			</View>
		) : (
			<LoadingCircle />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	},
	row: {
		flex: 1,
		margin: 0,
		paddingBottom: 8
	},
	column: {
		flex: 1
	},
	rowList: {
		flex: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,

		elevation: 1,
		backgroundColor: '#fff'
	},
	columnList: {
		flex: 1,
		justifyContent: 'center',
		padding: 4,
		backgroundColor: '#fff'
	},
	mediumStrong: {
		fontSize: 18,
		fontWeight: '800'
	},
	small: { fontSize: 14 },
	smallRight: { fontSize: 14, textAlign: 'right' },
	micro: { fontSize: 10 },
	buttonClear: {
		elevation: 0,
		backgroundColor: '#ccc',
		borderRadius: 0,
		color: '#000'
	},
	text: {
		textAlign: 'center',
		padding: 8,
		color: '#000',
		fontWeight: '400'
	},
	trackerCol: {
		backgroundColor: '#ccc',
		color: '#888',
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	trackerColReady: {
		backgroundColor: '#71F570',
		color: '#888',
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dishStatus: {
		height: 62,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.18,
		shadowRadius: 4.0,

		elevation: 2,
		backgroundColor: '#fff'
	}
});
