import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalBody,
  Input,
  Textarea
} from "@heroui/react";
import { Button } from "@heroui/button";
import { Form, useNavigation } from 'react-router';

export function ContactUsForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let transition = useNavigation();
  let isAdding = transition.state == "submitting";
  let formRef = useRef<HTMLFormElement>(null);
  let { t } = useTranslation();

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();

    } else {
      setIsModalOpen(true);
    }
  }, [isAdding]);

  return (
    <>
      <Form method='post' ref={formRef}>
        <div className="my-6">
          <Input type="text" label={t("nameSurname")} id="name" name="name" isRequired required />
        </div>
        <div className="my-6">
          <Input type="tel" label={t("phone")} name="tel" isRequired required />
        </div>
        <div className="my-6">
          <Textarea
            label={t("message")}
            className=""
            name="message"
            isRequired
            required
          />
        </div>
        <div className="my-6 flex justify-center">
          <Button className="bg-amber-500 text-white" type="submit">{t("send")}</Button>
        </div>
      </Form>
      <Modal
        isOpen={isModalOpen}
        placement={'bottom'}
        size={'xs'}
        backdrop="transparent"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="text-center">
                  {t("formSubmitSuccess")}
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}