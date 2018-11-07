import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const ProfileForm = () => (
  <form>
    <Row>
      <Input s={8} label="Email" disabled />
      <Input s={8} label="Username" />
      <Input s={8} label="Full Name" />
      <Input type="text" label="Contact" s={8} />
      <div className="col input-field s8">
        <Button waves='light' node='button'> Edit Profile</Button>
      </div>
    </Row>
  </form>
);

export default ProfileForm;
