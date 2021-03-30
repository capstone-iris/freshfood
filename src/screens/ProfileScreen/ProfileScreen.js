import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import {
	Avatar,
	Title,
	Caption,
	Text,
	TouchableRipple,
} from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default class ProfileScreen extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = () => {
		const usersRef = firebase.firestore().collection('users');
		let currentUser = firebase.auth().currentUser.uid;

		usersRef.get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				if (currentUser === doc.data().id) this.setState({ users: doc.data() });
			});
		});
	};

	onSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('Signed Out');
			})
			.catch((e) => {
				console.error('Sign Out Error', e);
			});
	};

	render() {
		const user = this.state.users;
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.userInfoSection}>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 30,
							alignItems: 'center',
						}}
					>
						<Avatar.Image
							source={{
								uri:
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUTBClYADFs5Xv7s0Uu3_1eXFalW-VzKMp74KcMmwDuYJwGdyeFpSSNB6x1w&usqp=CAc',
							}}
							size={80}
						/>
						<View style={{ marginLeft: 20 }}>
							<Title style={styles.title}>{user.fullName}</Title>
						</View>
					</View>
				</View>

				<View style={styles.userInfoSection}>
					<View style={styles.row}>
						<FontAwesome name='phone' size={20} color='#777777' />
						<Text style={{ color: '#777777', marginLeft: 20 }}>
							{user.phoneNumber}
						</Text>
					</View>
					<View style={styles.row}>
						<MaterialIcons name='email' size={20} color='#777777' />
						<Text style={{ color: '#777777', marginLeft: 20 }}>
							{user.email}
						</Text>
					</View>
				</View>

				<View style={styles.infoBoxWrapper}>
					<View style={styles.infoBox}>
						<Title>1</Title>
						<Caption>Hosted Events</Caption>
					</View>
					<View style={styles.infoBox}>
						<Title>4</Title>
						<Caption>Invited Events</Caption>
					</View>
				</View>

				<View style={styles.menuWrapper}>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='hearto' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Your Favorites</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='creditcard' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Payment</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<AntDesign name='bells' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Notifications</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.menuItem}>
							<MaterialCommunityIcons name='account-box-outline' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Support</Text>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={this.onSignOut}>
						<View style={styles.menuItem}>
							<AntDesign name='logout' color='#FF6347' size={25} />
							<Text style={styles.menuItemText}>Sign out</Text>
						</View>
					</TouchableRipple>
				</View>
			</SafeAreaView>
		);
	}
}
