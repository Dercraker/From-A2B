resource "null_resource" "provision_swarm" {
  provisioner "local-exec" {
    command = "ansible-playbook -i ../ansible/inventory.yml ../ansible/playbook.yml"
  }
}
