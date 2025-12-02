import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const data = Array.from({ length: 50 }, (_, index) => {
  const isLegalEntity = index % 3 === 0; 
  const type = isLegalEntity ? "legal" : "physical"; 
  
  return {
    id: index + 1,
    fullName: isLegalEntity ? `Şirkət ${index + 1} MMC` : `Sakin ${index + 1} Ad Soyad`,
    phone: `050-000-${String(index + 1).padStart(2, "0")}`,
    email: `sakin${index + 1}@mail.com`,
    apartment: `Mənzil ${Math.floor(index / 2) + 1}`,
    block: `Blok ${String.fromCharCode(65 + (index % 5))}`,
    floor: Math.floor(index / 5) + 1,
    status: index % 2 === 0 ? "Aktiv" : "Passiv",
    type: type,
    fin: isLegalEntity ? null : `123456789${String(index).padStart(2, "0")}`,
    birthDate: isLegalEntity ? null : `199${index % 10}-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
    gender: isLegalEntity ? null : (index % 2 === 0 ? "Kişi" : "Qadın"),
    voen: isLegalEntity ? `123456789${String(index).padStart(2, "0")}` : null,
    registrationDate: isLegalEntity ? `202${index % 4}-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}` : null,
    address: `Bakı şəhəri, ${index + 1} küçəsi, ${index + 10} ev`,
    registrationAddress: `Bakı şəhəri, ${index + 5} küçəsi, ${index + 15} ev`,
    joinDate: `202${index % 4}-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
    notes: index % 5 === 0 ? "Xüsusi qeydlər burada yer alır" : "",
    emergencyContact: `Fövqəladə hal üçün: ${String(index + 100).padStart(3, "0")}-${String(index + 1).padStart(2, "0")}-${String(index + 10).padStart(2, "0")}`,
    paymentMethod: index % 3 === 0 ? "Kart" : index % 3 === 1 ? "Nağd" : "Bank köçürməsi",
    balance: (index * 100) - (index * 50), 
  };
});

const ITEMS_PER_PAGE = 10;

const ResidentsPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [formFullName, setFormFullName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formApartment, setFormApartment] = useState("");
  const [formStatus, setFormStatus] = useState("Aktiv");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  const openCreateModal = () => {
    setSelectedItem(null);
    setFormFullName("");
    setFormPhone("");
    setFormEmail("");
    setFormApartment("");
    setFormStatus("Aktiv");
    setCreateOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormFullName(item.fullName);
    setFormPhone(item.phone);
    setFormEmail(item.email);
    setFormApartment(item.apartment);
    setFormStatus(item.status);
    setEditOpen(true);
  };

  const handleFilterApply = () => {
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setFilterName("");
    setFilterStatus("");
    setFilterOpen(false);
  };

  const handleCreateSave = () => {
    setCreateOpen(false);
  };

  const handleEditSave = () => {
    setEditOpen(false);
  };

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  return (
    <div className=" ">
      {/* Section title bar to match Home design */}
      <div className="w-full bg-black dark:bg-gray-800 my-4 p-4 rounded-lg shadow-lg mb-6 border border-red-600 dark:border-gray-700">
        <h3 className="text-white font-bold">{t("residents.pageTitle")}</h3>
      </div>

      {/* Filter modal */}
      <Dialog open={filterOpen} handler={setFilterOpen} size="sm" className="dark:bg-gray-900">
        <DialogHeader className="dark:bg-gray-800 dark:text-white">{t("residents.filter.title")}</DialogHeader>
        <DialogBody divider className="space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.filter.fullName")}
            </Typography>
            <Input
              label={t("residents.filter.enterFullName")}
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="dark:text-white"
              labelProps={{ className: "dark:text-gray-400" }}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.filter.status")}
            </Typography>
            <Select
              label={t("residents.filter.enterStatus")}
              value={filterStatus}
              onChange={(val) => setFilterStatus(val || "")}
              className="dark:text-white"
            >
              <Option value="Aktiv">{t("residents.status.active")}</Option>
              <Option value="Passiv">{t("residents.status.passive")}</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between gap-2 dark:bg-gray-800 dark:border-gray-700">
          <Button variant="text" color="blue-gray" onClick={handleFilterClear} className="dark:text-gray-300 dark:hover:bg-gray-700">
            {t("residents.filter.clear")}
          </Button>
          <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" onClick={() => setFilterOpen(false)} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              {t("residents.filter.close")}
            </Button>
            <Button color="blue" onClick={handleFilterApply} className="dark:bg-blue-600 dark:hover:bg-blue-700">
              {t("residents.filter.apply")}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Create resident modal */}
      <Dialog open={createOpen} handler={setCreateOpen} size="sm" className="dark:bg-gray-900">
        <DialogHeader className="dark:bg-gray-800 dark:text-white">{t("residents.create.title")}</DialogHeader>
        <DialogBody divider className="space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.create.fullName")}
            </Typography>
            <Input
              label={t("residents.create.enterFullName")}
              value={formFullName}
              onChange={(e) => setFormFullName(e.target.value)}
              className="dark:text-white"
              labelProps={{ className: "dark:text-gray-400" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
                {t("residents.create.phone")}
              </Typography>
              <Input
                label={t("residents.create.enterPhone")}
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="dark:text-white"
                labelProps={{ className: "dark:text-gray-400" }}
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
                {t("residents.create.email")}
              </Typography>
              <Input
                label={t("residents.create.enterEmail")}
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="dark:text-white"
                labelProps={{ className: "dark:text-gray-400" }}
              />
            </div>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.create.apartment")}
            </Typography>
            <Input
              label={t("residents.create.enterApartment")}
              value={formApartment}
              onChange={(e) => setFormApartment(e.target.value)}
              className="dark:text-white"
              labelProps={{ className: "dark:text-gray-400" }}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.create.status")}
            </Typography>
            <Select
              label={t("residents.create.enterStatus")}
              value={formStatus}
              onChange={(val) => setFormStatus(val || "Aktiv")}
              className="dark:text-white"
            >
              <Option value="Aktiv">{t("residents.status.active")}</Option>
              <Option value="Passiv">{t("residents.status.passive")}</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-2 dark:bg-gray-800 dark:border-gray-700">
          <Button variant="outlined" color="blue-gray" onClick={() => setCreateOpen(false)} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            {t("residents.create.cancel")}
          </Button>
          <Button color="green" onClick={handleCreateSave} className="dark:bg-green-600 dark:hover:bg-green-700">
            {t("residents.create.save")}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Edit resident modal */}
      <Dialog open={editOpen} handler={setEditOpen} size="sm" className="dark:bg-gray-900">
        <DialogHeader className="dark:bg-gray-800 dark:text-white">{t("residents.edit.title")}</DialogHeader>
        <DialogBody divider className="space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.edit.fullName")}
            </Typography>
            <Input
              label={t("residents.edit.enterFullName")}
              value={formFullName}
              onChange={(e) => setFormFullName(e.target.value)}
              className="dark:text-white"
              labelProps={{ className: "dark:text-gray-400" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
                {t("residents.edit.phone")}
              </Typography>
              <Input
                label={t("residents.edit.enterPhone")}
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="dark:text-white"
                labelProps={{ className: "dark:text-gray-400" }}
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
                {t("residents.edit.email")}
              </Typography>
              <Input
                label={t("residents.edit.enterEmail")}
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="dark:text-white"
                labelProps={{ className: "dark:text-gray-400" }}
              />
            </div>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.edit.apartment")}
            </Typography>
            <Input
              label={t("residents.edit.enterApartment")}
              value={formApartment}
              onChange={(e) => setFormApartment(e.target.value)}
              className="dark:text-white"
              labelProps={{ className: "dark:text-gray-400" }}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 dark:text-gray-300">
              {t("residents.edit.status")}
            </Typography>
            <Select
              label={t("residents.edit.enterStatus")}
              value={formStatus}
              onChange={(val) => setFormStatus(val || "Aktiv")}
              className="dark:text-white"
            >
              <Option value="Aktiv">{t("residents.status.active")}</Option>
              <Option value="Passiv">{t("residents.status.passive")}</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-2 dark:bg-gray-800 dark:border-gray-700">
          <Button variant="outlined" color="blue-gray" onClick={() => setEditOpen(false)} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            {t("residents.edit.cancel")}
          </Button>
          <Button color="blue" onClick={handleEditSave} className="dark:bg-blue-600 dark:hover:bg-blue-700">
            {t("residents.edit.save")}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Detail modal - Böyük ölçüdə */}
      {selectedItem && (
      <Dialog open={detailOpen} handler={setDetailOpen} size="xl" className="dark:bg-gray-900">
        <DialogHeader className="dark:bg-gray-800 dark:text-white text-xl font-bold">
          {t("residents.detail.title")}
        </DialogHeader>
        <DialogBody divider className="dark:bg-gray-800 dark:border-gray-700 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
              {/* Əsas məlumatlar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                    {t("residents.detail.fullName")}
                  </Typography>
                  <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold">
                    {selectedItem.fullName}
                  </Typography>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                    {t("residents.detail.type")}
                  </Typography>
                  <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold">
                    {selectedItem.type === "legal" ? t("residents.detail.legalEntity") : t("residents.detail.physicalPerson")}
                  </Typography>
                </div>
              </div>

              {/* Fiziki şəxs məlumatları */}
              {selectedItem.type === "physical" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                    {t("residents.detail.physicalPersonInfo")}
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                        {t("residents.detail.fin")}
                      </Typography>
                      <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                        {selectedItem.fin}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                        {t("residents.detail.birthDate")}
                      </Typography>
                      <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                        {selectedItem.birthDate}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                        {t("residents.detail.gender")}
                      </Typography>
                      <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                        {selectedItem.gender}
                      </Typography>
                    </div>
                  </div>
                </div>
              )}

              {/* Hüquqi şəxs məlumatları */}
              {selectedItem.type === "legal" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                    {t("residents.detail.legalEntityInfo")}
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                        {t("residents.detail.voen")}
                      </Typography>
                      <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                        {selectedItem.voen}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                        {t("residents.detail.registrationDate")}
                      </Typography>
                      <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                        {selectedItem.registrationDate}
                      </Typography>
                    </div>
                  </div>
                </div>
              )}

              {/* Əlaqə məlumatları */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                  {t("residents.detail.contactInfo")}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.phone")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.phone}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.email")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.email}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.emergencyContact")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.emergencyContact}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Mənzil məlumatları */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                  {t("residents.detail.apartmentInfo")}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.apartment")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.apartment}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.block")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.block}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.floor")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.floor}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Ünvan məlumatları */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                  {t("residents.detail.addressInfo")}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.address")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.address}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.registrationAddress")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.registrationAddress}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Maliyyə məlumatları */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                  {t("residents.detail.financialInfo")}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.balance")}
                    </Typography>
                    <Typography 
                      variant="paragraph" 
                      className={`font-semibold ${selectedItem.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {selectedItem.balance >= 0 ? "+" : ""}{selectedItem.balance.toFixed(2)} AZN
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.paymentMethod")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.paymentMethod}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Digər məlumatlar */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <Typography variant="h6" className="text-blue-gray-900 dark:text-white font-bold mb-4">
                  {t("residents.detail.otherInfo")}
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.status")}
                    </Typography>
                    <Typography 
                      variant="paragraph" 
                      className={`font-semibold ${selectedItem.status === "Aktiv" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {selectedItem.status}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                      {t("residents.detail.joinDate")}
                    </Typography>
                    <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white font-semibold">
                      {selectedItem.joinDate}
                    </Typography>
                  </div>
                  {selectedItem.notes && (
                    <div className="md:col-span-2">
                      <Typography variant="small" className="text-blue-gray-600 dark:text-gray-400 mb-1">
                        {t("residents.detail.notes")}
                      </Typography>
                      <Typography variant="paragraph" className="text-blue-gray-900 dark:text-white">
                        {selectedItem.notes}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-2 dark:bg-gray-800 dark:border-gray-700">
          <Button variant="outlined" color="blue-gray" onClick={() => setDetailOpen(false)} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            {t("residents.detail.close")}
          </Button>
          <Button color="blue" onClick={() => { setDetailOpen(false); if(selectedItem) openEditModal(selectedItem); }} className="dark:bg-blue-600 dark:hover:bg-blue-700">
            {t("residents.detail.edit")}
          </Button>
        </DialogFooter>
      </Dialog>
      )}

      <Card className="border border-red-600 dark:border-gray-700 shadow-sm dark:bg-gray-800">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6 dark:bg-gray-800"
        >
          <div className="flex items-center gap-3">
            <Button variant="outlined" color="blue" onClick={() => setFilterOpen(true)} className="dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20">
              {t("residents.actions.search")}
            </Button>
            <Button color="green" onClick={openCreateModal} className="dark:bg-green-600 dark:hover:bg-green-700">
              {t("residents.actions.add")}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2 dark:bg-gray-800">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Spinner className="h-6 w-6" />
              <Typography variant="small" className="mt-2 text-blue-gray-400 dark:text-gray-400">
                {t("residents.loading")}
              </Typography>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      {[t("residents.table.id"), t("residents.table.fullName"), t("residents.table.phone"), t("residents.table.email"), t("residents.table.apartment"), t("residents.table.type"), t("residents.table.finOrVoen"), t("residents.table.status"), t("residents.table.actions")].map(
                        (el, idx) => (
                          <th
                            key={el}
                            className={`border-b border-blue-gray-100 dark:border-gray-800 py-3 px-6 text-left ${
                              idx === 8 ? "text-right" : ""
                            }`}
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400 dark:text-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((row, key) => {
                      const className = `py-3 px-6 ${
                        key === pageData.length - 1 ? "" : "border-b border-blue-gray-50 dark:border-gray-800"
                      }`;
                      return (
                        <tr 
                          key={row.id} 
                          className="dark:hover:bg-gray-700/50 cursor-pointer"
                          onClick={() => openDetailModal(row)}
                        >
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                              {row.id}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetailModal(row);
                              }}
                            >
                              {row.fullName}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                              {row.phone}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                              {row.email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                              {row.apartment}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="dark:text-gray-300 font-semibold">
                              {row.type === "physical" ? t("residents.detail.physicalPerson") : t("residents.detail.legalEntity")}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                              {row.type === "physical" ? row.fin : row.voen}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color={row.status === "Aktiv" ? "green" : "red"}
                              className={row.status === "Aktiv" ? "dark:text-green-300" : "dark:text-red-400"}
                            >
                              {row.status}
                            </Typography>
                          </td>
                          <td className={`${className} text-right`}>
                            <Menu placement="left-start">
                              <MenuHandler>
                                <IconButton size="sm" variant="text" color="blue-gray" className="dark:text-gray-300 dark:hover:bg-gray-700">
                                  <EllipsisVerticalIcon
                                    strokeWidth={2}
                                    className="h-5 w-5"
                                  />
                                </IconButton>
                              </MenuHandler>
                              <MenuList className="dark:bg-gray-800 dark:border-gray-700">
                                <MenuItem onClick={(e) => { e.stopPropagation(); openEditModal(row); }} className="dark:text-gray-300 dark:hover:bg-gray-700">{t("residents.actions.edit")}</MenuItem>
                                <MenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t("residents.actions.delete")}</MenuItem>
                              </MenuList>
                            </Menu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tablet & mobile cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:hidden px-4 pt-4">
                {pageData.map((row) => (
                  <Card
                    key={row.id}
                    className="border border-red-600 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => openDetailModal(row)}
                    >
                    <CardBody className="space-y-3 dark:bg-gray-800">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-[11px] font-medium uppercase dark:text-gray-400"
                          >
                            {t("residents.table.fullName")}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold dark:text-white"
                          >
                            {row.fullName}
                          </Typography>
                        </div>
                        <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton size="sm" variant="text" color="blue-gray" className="dark:text-gray-300 dark:hover:bg-gray-700">
                              <EllipsisVerticalIcon
                                strokeWidth={2}
                                className="h-5 w-5"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList className="dark:bg-gray-800 dark:border-gray-700">
                            <MenuItem onClick={(e) => { e.stopPropagation(); openEditModal(row); }} className="dark:text-gray-300 dark:hover:bg-gray-700">{t("residents.actions.edit")}</MenuItem>
                            <MenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t("residents.actions.delete")}</MenuItem>
                          </MenuList>
                        </Menu>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.id")}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                          {row.id}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.email")}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                          {row.email}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.phone")}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                          {row.phone}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.apartment")}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                          {row.apartment}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.type")}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="dark:text-gray-300 font-semibold">
                          {row.type === "physical" ? t("residents.detail.physicalPerson") : t("residents.detail.legalEntity")}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.finOrVoen")}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="dark:text-gray-300">
                          {row.type === "physical" ? row.fin : row.voen}
                        </Typography>
                      </div>

                      <div className="space-y-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-[11px] font-medium uppercase dark:text-gray-400"
                        >
                          {t("residents.table.status")}
                        </Typography>
                        <Typography
                          variant="small"
                          color={row.status === "Aktiv" ? "green" : "red"}
                          className={`font-semibold ${row.status === "Aktiv" ? "dark:text-green-300" : "dark:text-red-400"}`}
                        >
                          {row.status}
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

      <div className="flex items-center justify-end gap-2 px-6 pt-4">
                <Button
                  variant="text"
                  size="sm"
                  color="blue-gray"
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:text-gray-600"
                >
                  {t("residents.pagination.prev")}
                </Button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === page ? "filled" : "text"}
                      size="sm"
                      color={pageNumber === page ? "blue" : "blue-gray"}
                      onClick={() => setPage(pageNumber)}
                      className={`min-w-[32px] px-2 ${
                        pageNumber === page 
                          ? "dark:bg-blue-600 dark:hover:bg-blue-700" 
                          : "dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  )
                )}
                <Button
                  variant="text"
                  size="sm"
                  color="blue-gray"
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:text-gray-600"
                >
                  {t("residents.pagination.next")}
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ResidentsPage;
