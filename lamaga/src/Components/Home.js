import React from 'react';

const Home = (props) => {

    return (
        <div>
            <form onSubmit={(e) => props.sub(e)}>
                <label id={'add'}>
                    Address:    <t></t>
                    <input
                    type="text"
                    name="address"
                    onChange={props.change}
                    placeholder="Ex: 123 Broadway St. Seattle WA 98101"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;
