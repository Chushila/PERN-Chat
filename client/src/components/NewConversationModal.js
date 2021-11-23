import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addConversation } from "./redux/Slices/UserSlice";
import { createConversation } from "../api/convesationsAPI";
import { v4 as uuidV4 } from "uuid";

export default function NewConversationModal({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const contacts = useSelector((state) => state.user.contacts);
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  function handleCheckboxChange(contactId) {
    setSelectedContactsIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const id = uuidV4();
    await createConversation(selectedContactsIds, user, id);
    dispatch(addConversation({ selectedContactsIds, id }));
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body id="contactModal">
        {contacts.length > 0 ? (
          <Form onSubmit={handleSubmit}>
            {contacts.map((contact) => (
              <Form.Group
                controlId={contact.contact_user_id}
                key={contact.contact_user_id}
              >
                <Form.Check
                  type="checkbox"
                  value={selectedContactsIds.includes(contact.contact_user_id)}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact.contact_user_id)}
                />
              </Form.Group>
            ))}
            <Button type="submit">Create</Button>
          </Form>
        ) : (
          <p>Try adding some contacts first</p>
        )}
      </Modal.Body>
    </>
  );
}
