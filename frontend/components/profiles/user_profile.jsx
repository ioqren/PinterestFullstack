import React from 'react';
import GreetingContainer from '../header/greeting_container';
import EditBoardContainer from '../boards/edit_board_container';
import CreateBoardContainer from '../boards/create_board_container';

import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: 0,
	},

	overlay: {
		zIndex: 9999999,
	},
};

class UserProfile extends React.Component {
	componentDidMount() {
		this.props.clearPins();
		this.props.clearUsers();
		this.props.fetchUser(this.props.username);
		this.props.fetchBoards(this.props.username).then(res => {
			let boards = Object.values(res.boards);
			boards.forEach(board => {
				this.props.fetchPins(board.id);
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		let user = this.props.user[0];
		if (user) {
			if (!(this.state.followed === prevState.followed)) this.props.fetchUser(user.username);
		}
	}

	constructor(props) {
		super(props);
		this.toggleClass = this.toggleClass.bind(this);
		this.state = {
			active: false,
			currentPage: 'boards',
			pinList: null,
			hovered: false,
			editHovered: false,
			modalIsOpen: false,
			createModalIsOpen: false,
			redirect: null,
			currentBoard: null,
			followed: null,
			user: null,
			boards: null,
		};

		this.renderPins = this.renderPins.bind(this);
		this.renderBoards = this.renderBoards.bind(this);
		this.addFollow = this.addFollow.bind(this);
		this.removeFollow = this.removeFollow.bind(this);
		this.getImages = this.getImages.bind(this);
		this.renderFollows = this.renderFollows.bind(this);
		this.addHovered = this.addHovered.bind(this);
		this.removeHovered = this.removeHovered.bind(this);
		this.addEditHovered = this.addEditHovered.bind(this);
		this.removeEditHovered = this.removeEditHovered.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openCreateModal = this.openCreateModal.bind(this);
		this.closeCreateModal = this.closeCreateModal.bind(this);
	}

	addFollow(follow) {
		this.props.addFollow(follow);
		this.setState({ followed: true });
	}

	removeFollow(id) {
		this.props.removeFollow(id);
		this.setState({ followed: false });
	}

	openModal() {
		this.setState({ modalIsOpen: true, editHovered: true, hovered: false });
	}

	closeModal() {
		this.setState({ modalIsOpen: false, editHovered: true });
	}

	openCreateModal() {
		this.setState({ createModalIsOpen: true });
	}

	closeCreateModal() {
		this.setState({ createModalIsOpen: false });
	}

	renderRedirect(id) {
		if (!this.state.editHovered && !this.state.modalIsOpen) {
			this.props.history.push(`/board/${id}`);
		} else {
			this.setState({ hovered: false });
		}
	}

	toggleClass() {
		const currentState = this.state.active;
		this.setState({ active: !currentState });
	}

	showBoards() {
		this.setState({ currentPage: 'boards' });
	}

	showPins() {
		this.setState({ currentPage: 'pins' });
	}

	getImages(board) {
		const pins = this.props.pins;
		if (Object.keys(pins).length === 0) return null;
		console.log(pins);
		let pinIds = board.pin_ids;
		let blanks = 6 - board.pin_ids.length;
		if (blanks) {
			for (let i = 0; i < blanks; i++) {
				pinIds.push(null);
			}
		};
		let blankImg =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEXExMQCQxelAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC';

		return (
			<div key={board.id} className="pinWrapperContainer">
				{pinIds.map(pin_id => {

					let img = pins[pin_id] ? pins[pin_id].photoUrl : blankImg
					return (
						<div className="pinWrapper" key={pin_id}>
							<img src={img} className="pinImg" />
							<div className="pinText" />
						</div>
					)
				})}
			</div>
		);
	}

	addHovered(id) {
		this.setState({ hovered: id });
	}

	removeHovered() {
		this.setState({ hovered: false });
	}

	addEditHovered() {
		this.setState({ editHovered: true });
	}

	removeEditHovered() {
		this.setState({ editHovered: false });
	}

	renderBoards() {
		let boards;
		boards = this.props.boards ? this.props.boards : [];
		let boardList;
		boardList = (
			<div className="gridContainer">
				{boards.map(board => {
					return (
						<div className="grid" key={board.id}>
							<div
								className="boardWrapper"
								onMouseOver={() => this.addHovered(board.id)}
								onMouseLeave={this.removeHovered}
								onClick={() => this.renderRedirect(board.id)}
							>
								<div className="boardImg">
									<span>{this.getImages(board)}</span>
								</div>
								<div className="boardText" />
								<div className="boardLinks">
									<div className="leftBoardLinks">
										<div className="boardTitle">{board.title}</div>
										<div className="numPins">{board.pins.length} Pins</div>
									</div>
									<div
										onMouseOver={this.addEditHovered}
										onMouseLeave={this.removeEditHovered}
										onClick={this.openModal}
										className={
											this.state.hovered === board.id
												? 'rightBoardLinks'
												: 'rightBoardLinks hidden'
										}
									>
										<i className="fas fa-edit fa-lg" />
									</div>

									<Modal
										isOpen={this.state.modalIsOpen}
										onAfterOpen={this.afterOpenModal}
										onRequestClose={this.closeModal}
										shouldCloseOnOverlayClick={true}
										style={customStyles}
										animationType={'slide'}
										isVisible={this.state.ModalVisibleStatus}
										contentLabel="Board edit form"
									>
										<EditBoardContainer boardId={board.id} />
									</Modal>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
		return boardList;
	}

	renderPins() {
		const pins = Object.values(this.props.pins);
		let pinList = (
			<div className="grid" id="userPinGrid">
				{pins.map(pin => {
					let title = pin.title ? pin.title : null;
					return (
						<Link to={`/pin/${pin.id}`}>
							<div className="pinWrapper" key={pin.id}>
								<img src={pin.photoUrl} className="pinImg" />
								<div className="pinText" />
								<div className="pinTitle">
									<span>{title}</span>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		);
		return pinList;
	}

	renderFollows(followed, id) {
		if (this.state.followed === null) this.setState({ followed });
		if (!this.state.followed) {
			return (
				<button
					className="followBtn"
					onClick={() =>
						this.addFollow({
							followed_id: this.props.currentUserId,
							follower_id: this.props.user[0].id,
						})
					}
				>
					Follow
				</button>
			);
		} else {
			return (
				<button className="followBtn" onClick={() => this.removeFollow(id)}>
					Unfollow
				</button>
			);
		}
	}

	render() {
		if (!this.props.user[0] || !this.props.boards || !this.props.pins) return null;
		let content = this.state.currentPage === 'boards' ? this.renderBoards() : this.renderPins();
		let follows = this.props.user[0].follows ? this.props.user[0].follows.length : 0;
		let followersList = {};
		this.props.user[0].followers.forEach(follow => {
			followersList[follow.follower_id] = follow.id;
		});
		let followers = Object.values(followersList).length;
		if (this.state.followed) followers++;
		let followedIds = Object.keys(followersList).map(key => parseInt(key));
		let alreadyFollowed = followedIds.includes(this.props.user[0].id);
		let followId = followersList[this.props.user[0].id] || null;
		let followBtn = this.renderFollows(alreadyFollowed, followId);

		return (
			<div>
				<GreetingContainer />
				<div className="userProfileContainer">
					<div className="profileHeader">
						<div className="profileHeaderTop">
							<div className="dropdown">
								<i onClick={this.toggleClass} className="dropbtn fas fa-plus fa-lg" />
								{this.state.active ? (
									<ul className="dropdown-content">
										<Link to="/pin/new">Create pin</Link>
										<a onClick={this.openCreateModal}>Create board</a>
										<Modal
											isOpen={this.state.createModalIsOpen}
											onRequestClose={this.closeCreateModal}
											shouldCloseOnOverlayClick={true}
											style={customStyles}
											animationType={'slide'}
											isVisible={this.state.ModalVisibleStatus}
											contentLabel="Board edit form"
										>
											<CreateBoardContainer />
										</Modal>
									</ul>
								) : null}
							</div>
							<div className="dropdown">
								<Link to="/edit">
									<i className="dropbtn fas fa-edit fa-lg" />
								</Link>
							</div>
						</div>

						<div className="profileHeaderMid">
							<div>
								<h1>
									{this.props.user[0].first_name} {this.props.user[0].last_name}
								</h1>
								<p>
									{followers} followers · {follows} following
								</p>
							</div>

							<div className="buttonsContainer">{followBtn}</div>
						</div>

						<div className="profileHeaderBottom">
							<span
								onClick={this.showBoards.bind(this)}
								className={
									this.state.currentPage === 'boards' ? 'headerLinkText active' : 'headerLinkText'
								}
							>
								Boards
							</span>
							<span
								onClick={this.showPins.bind(this)}
								className={
									this.state.currentPage === 'pins' ? 'headerLinkText active' : 'headerLinkText'
								}
							>
								Pins
							</span>
						</div>
					</div>
					<div className="profileContent">{content}</div>

					<div className="addPinBtnContainer">
						<Link to="/pin/new">
							<button className="addPinBtn">
								<span>+</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default UserProfile;
