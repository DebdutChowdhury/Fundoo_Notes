import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../Component/Login/Login'

Enzyme.configure({ adapter: new EnzymeAdapter })

it("renders Login component without crashing ", () => {
    const wrapper = shallow(<Login/>)
    console.log("wrapper", wrapper.debug());

})

it("render maindiv in component without crashing",()=>{
    const shallowwrapper = shallow(<Login/>);
    const maindiv=shallowwrapper.find(`[className="fullbody"]`);
    expect(maindiv.length).toBe(1)

})

it("render email textfield without crashing",()=>{
    const shallowwrapper = shallow(<Login/>);
    const maindiv=shallowwrapper.find(`[className="textfields"]`);
    expect(maindiv.length).toBe(1)

})

it("render button without crashing",()=>{
    const shallowwrapper = shallow(<Login/>);
    const maindiv=shallowwrapper.find(`[className="inline__button"]`);
    expect(maindiv.length).toBe(1)
})

// for snapshot
it('renders correctly', () => {
    const tree = renderer.create(
        <Login/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});